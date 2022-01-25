package com.example.demo.dao;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Repository
@Transactional
public class SalaDao {

    @PersistenceContext
    public EntityManager entityManager;

    public void bookIt(int id) {
        entityManager.createQuery("update Sala set stare = TRUE where id = :id").setParameter("id", id).executeUpdate();
    }

    public void unbookIt(int id) {
        entityManager.createQuery("update Sala set stare = FALSE where id = :id").setParameter("id", id).executeUpdate();
    }

}
