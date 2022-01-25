package com.example.demo.dao;

import com.example.demo.models.Rezervare;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Repository
@Transactional
public class RezervareDao {

    @PersistenceContext
    public EntityManager entityManager;
    @Autowired
    private SalaDao salaDao;

    public void updateSalaStatus() {
        List<Rezervare> rezervari = entityManager.createQuery("from Rezervare").getResultList();

        for (Rezervare rezervare : rezervari) {
            String formattedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            String data_finish = rezervare.getFinish().toString();
            String data_start = rezervare.getStart().toString();
            if (formattedDate.compareTo(data_finish) < 0 && formattedDate.compareTo(data_start) >= 0) {
                salaDao.bookIt(rezervare.getId_sala());
            } else
                salaDao.unbookIt(rezervare.getId_sala());
        }
    }
}
