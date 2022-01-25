package com.example.demo.dao;

import com.example.demo.models.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class UserDao {

    @PersistenceContext
    public EntityManager entityManager;

    public List<User> getAll() {
        return entityManager.createQuery("from User").getResultList();
    }

    @Transactional
    public void registerUser(User user) {
     entityManager.createNativeQuery("INSERT INTO User (nume, prenume, permisiune, mail, parola) VALUES (?,?,?,?,?)")
                .setParameter(1, user.getNume())
                .setParameter(2, user.getPrenume())
                .setParameter(3, user.getPermisiune())
                .setParameter(4, user.getMail())
                .setParameter(5, user.getParola())
                .executeUpdate();
    }
}
