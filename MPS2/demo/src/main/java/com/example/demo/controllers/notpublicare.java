package com.example.demo.controllers;

public class notpublicare {
    /*
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

    public void create(Sala sala) {
        entityManager.persist(sala);
        return;
    }

    public void delete(Sala sala) {
        if (entityManager.contains(sala))
            entityManager.remove(sala);
        else
            entityManager.remove(entityManager.merge(sala));
        return;
    }

    public List<Sala> getAll() {
        return entityManager.createQuery("from Sala").getResultList();
    }

    public Sala getByNume(String nume) {
        return (Sala) entityManager.createQuery(
                "from Sala where nume = :nume")
                .setParameter("nume", nume)
                .getSingleResult();
    }

    public Sala getById(int id) {
        return entityManager.find(Sala.class, id);
    }

    public void update(Sala user) {
        entityManager.merge(user);
        return;
    }

    @PersistenceContext
    public EntityManager entityManager;
}
     */

}
