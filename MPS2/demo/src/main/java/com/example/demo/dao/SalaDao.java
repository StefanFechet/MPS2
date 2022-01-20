package com.example.demo.dao;

import com.example.demo.models.Sala;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class SalaDao {

    @PersistenceContext
    public EntityManager entityManager;

    public List<Sala> getAll() {
        return entityManager.createQuery("from Sala").getResultList();
    }

    public Sala getById(int id) {
        return (Sala) entityManager.createQuery(
                "from Sala where id = :id")
                .setParameter("id", id)
                .getSingleResult();
    }

    public void bookIt(int id) {
        entityManager.createQuery("update Sala set stare = TRUE where id = :id").setParameter("id", id).executeUpdate();
    }

    public void unbookIt(int id) {
        entityManager.createQuery("update Sala set stare = FALSE where id = :id").setParameter("id", id).executeUpdate();
    }

    @Transactional
    public void createSala(String nume, String facultate, String descriere){
        entityManager.createNativeQuery("INSERT INTO Sala (nume, facultate, descriere, stare) VALUES (?, ?, ?, ?)")
                .setParameter(1, nume)
                .setParameter(2,facultate)
                .setParameter(3,descriere)
                .setParameter(4, false)
                .executeUpdate();
    }
}
