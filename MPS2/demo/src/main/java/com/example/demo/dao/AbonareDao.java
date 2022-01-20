package com.example.demo.dao;

import com.example.demo.models.Abonare;
import com.example.demo.models.Rezervare;
import com.example.demo.models.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Repository
@Transactional
public class AbonareDao {
    @PersistenceContext
    public EntityManager entityManager;

    @Transactional
    public void makeAbonare(int id_sala, int id_user){
        entityManager.createNativeQuery("INSERT INTO Abonare (id_sala, id_user) VALUES (?, ?)")
                .setParameter(1, id_sala)
                .setParameter(2,id_user)
                .executeUpdate();
    }

    public List<Abonare> getAllAbonariSala(int id_sala) {
        return entityManager.createQuery("from Abonare where id_sala = :id_sala")
                .setParameter("id_sala", id_sala)
                .getResultList();
    }
    public List<User>getAllAbonatiSala(int id_sala) {
        return entityManager.createQuery("select u from User u, Abonare a where a.id_user = u.id and a.id_sala = :id_sala")
                .setParameter("id_sala", id_sala)
                .getResultList();
    }


    public void deleteAbonare(int id_abonare) {
        entityManager.createQuery("delete FROM Abonare where id = :id_abonare")
                .setParameter("id_abonare", id_abonare)
                .executeUpdate();
    }

    public void deleteAbonare(int id_sala, int id_user) {
        entityManager.createQuery("delete FROM Abonare where id_sala = :id_sala and id_user = :id_user")
                .setParameter("id_sala", id_sala)
                .setParameter("id_user", id_user)
                .executeUpdate();
    }

}
