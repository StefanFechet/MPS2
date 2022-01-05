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

    public User getByNume(String nume) {
        return (User) entityManager.createQuery(
                "from User where nume = :nume")
                .setParameter("nume", nume)
                .getSingleResult();
    }

    public User getById(int id) {
        return entityManager.find(User.class, id);
    }

    public User getMailPassword(String mail, String parola) {
        User temp = new User();
        try {
            temp = (User) entityManager.createQuery(
                    "from User where mail = :mail and parola = :parola")
                    .setParameter("mail", mail)
                    .setParameter("parola", parola)
                    .getSingleResult();
        } catch (Exception e) {
        }
        return temp;
    }

    public boolean hasRights(int id) {
        User temp = (User) entityManager.createQuery(
                "from User where id = :id")
                .setParameter("id", id)
                .getSingleResult();
        return temp.getPermisiune();
    }
}