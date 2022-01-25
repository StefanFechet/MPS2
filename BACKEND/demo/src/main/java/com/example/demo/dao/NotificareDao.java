package com.example.demo.dao;


import com.example.demo.models.Abonare;
import com.example.demo.models.Notificare;
import com.example.demo.models.Rezervare;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.sql.Time;
import java.util.List;
import java.sql.Timestamp;

@Repository
@Transactional
@EnableScheduling
public class NotificareDao {
    @PersistenceContext
    public EntityManager entityManager;

    @Autowired
    private RezervareDao rezervareDao;

    @Autowired
    private AbonareDao abonareDao;

    @Autowired
    private SalaDao salaDao;

    @Scheduled(fixedRate = 1000)
    public void sendNotifications(){
        List<Rezervare> temp = rezervareDao.getAll();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        for(Rezervare r : temp){
            if(r.getFinish().getTime() / 1000 <= System.currentTimeMillis() / 1000 && System.currentTimeMillis() / 1000 < r.getFinish().getTime() / 1000 + 1){
                List <Abonare> abonari = abonareDao.getAllAbonariSala(r.getId_sala());
                for(Abonare ab : abonari){
                    entityManager.createNativeQuery("INSERT INTO Notificare (id_sala, id_user, mesaj, data_notificare, citit) VALUES (?,?,?,?,?)")
                            .setParameter(1, r.getId_sala())
                            .setParameter(2, ab.getId_user())
                            .setParameter(3, "Sala "+ salaDao.getById(r.getId_sala()).nume + " din facultatea " + salaDao.getById(r.getId_sala()).facultate + " a fost eliberată.")
                            .setParameter(4, new Timestamp(System.currentTimeMillis()))
                            .setParameter(5, false)
                            .executeUpdate();
                }
                abonareDao.deleteAbonareByClassroomId(r.getId_sala());
            }
        }
    }

    public List<Notificare> getAllNotificariUser(int id_user) {
        return entityManager.createQuery("from Notificare where id_user = :id_user")
                .setParameter("id_user", id_user)
                .getResultList();
    }

    public void markRead(int id){
        entityManager.createQuery("update Notificare set citit = true where id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }

    public void markReadUser(int id){
        entityManager.createQuery("update Notificare set citit = true where id_user = :id")
                .setParameter("id", id)
                .executeUpdate();
    }

    public void deleteNotification(int id){
        entityManager.createQuery("delete FROM Notificare where id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }

    public void deleteNotificationsUser(int id){
        entityManager.createQuery("delete FROM Notificare where id_user = :id")
                .setParameter("id", id)
                .executeUpdate();
    }
}
