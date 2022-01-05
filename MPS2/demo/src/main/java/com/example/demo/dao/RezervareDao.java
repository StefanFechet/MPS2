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

    public List<Rezervare> getAllBookingsWithID(int id_sala) {
        return entityManager.createQuery("from Rezervare where id_sala = :id_sala")
                .setParameter("id_sala", id_sala)
                .getResultList();
    }

    @Transactional
    public void makeBooking(Rezervare rezervare) {
        String data_finish = rezervare.getFinish().toString();
        String data_start = rezervare.getStart().toString();
        String formattedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        if (formattedDate.compareTo(data_finish) < 0 && data_start.compareTo(data_finish) < 0) {
            entityManager.createNativeQuery("INSERT INTO Rezervare (id_sala, id_user, start, finish, motiv, estimat_rezervare) VALUES (?,?,?,?,?,?)")
                    .setParameter(1, rezervare.getId_sala())
                    .setParameter(2, rezervare.getId_user())
                    .setParameter(3, rezervare.getStart())
                    .setParameter(4, rezervare.getFinish())
                    .setParameter(5, rezervare.getMotiv())
                    .setParameter(6, rezervare.getEstimat_rezervare())
                    .executeUpdate();

        }
    }

    public List<Rezervare> getAll() {
        return entityManager.createQuery("from Rezervare").getResultList();
    }

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