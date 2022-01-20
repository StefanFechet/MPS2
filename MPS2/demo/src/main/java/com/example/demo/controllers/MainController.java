package com.example.demo.controllers;

import com.example.demo.dao.*;
import com.example.demo.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class MainController {

    @Autowired
    private SalaDao salaDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private RezervareDao rezervareDao;
    @Autowired
    private AbonareDao abonareDao;
    @Autowired
    private NotificareDao notificareDao;

    @GetMapping("/login")
    public List<User> getAllUsers() {
        rezervareDao.updateSalaStatus();
        return userDao.getAll();
    }

    @PostMapping("/register")
    public void registerUser(@RequestParam String nume, @RequestParam String prenume, @RequestParam boolean permisiune, @RequestParam String mail, String parola) {
        User user = new User(nume, prenume, permisiune, mail, parola);
        userDao.registerUser(user);
    }

    @GetMapping("/sali")
    public List<Sala> getAllRooms() {
        rezervareDao.updateSalaStatus();
        return salaDao.getAll();
    }

    @PostMapping("/new_sala")
    public void createSala(String nume, String facultate, String descriere){
        salaDao.createSala(nume, facultate, descriere);
    }

    @RequestMapping("/istoric")
    public List<Rezervare> getRoomHistory(@RequestParam int id) {
        rezervareDao.updateSalaStatus();
        return rezervareDao.getAllBookingsWithID(id);
    }

    @RequestMapping("/istoric_sali")
    public List<Rezervare_full> getRoomHistory() {
        rezervareDao.updateSalaStatus();
        List<Rezervare> temp = rezervareDao.getAll();
        System.out.println(rezervareDao.getAll().get(0));
        List <Rezervare_full> fin = new ArrayList<>();
        for (Rezervare rezervare : temp) {
            Sala s = salaDao.getById(rezervare.getId_sala());
            Rezervare_full rf = new Rezervare_full(rezervare, s);
            fin.add(rf);
        }
        return fin;
    }

    @PostMapping("/new_booking")
    public void makeBooking(@RequestParam int id_sala, @RequestParam int id_user, @RequestParam String start, @RequestParam String finish, String motiv) {
        Rezervare rezervare = new Rezervare(id_sala, id_user, Timestamp.valueOf(start), Timestamp.valueOf(finish), motiv);
        rezervareDao.updateSalaStatus();
        rezervareDao.makeBooking(rezervare);
        rezervareDao.updateSalaStatus();
    }


    //ABONARE
    @RequestMapping("/abonari_sala")
    public List<Abonare> getAllAbonari(@RequestParam int id) {
        return abonareDao.getAllAbonariSala(id);
    }

    @RequestMapping("/abonati_sala")
    public List<User> getAllAbonati(@RequestParam int id) {
        return abonareDao.getAllAbonatiSala(id);
    }

    @PostMapping("/new_abonare")
    public void makeAbonare(@RequestParam int id_sala, @RequestParam int id_user) {
        abonareDao.makeAbonare(id_sala, id_user);
    }

    @DeleteMapping("/delete_abonare_by_id")
    public void deleteAbonare(@RequestParam int id_abonare){
        abonareDao.deleteAbonare(id_abonare);
    }

    @DeleteMapping("/delete_abonare")
    public void deleteAbonare(@RequestParam int id_sala, @RequestParam int id_user){
        abonareDao.deleteAbonare(id_sala, id_user);
    }


    //NOTIFICARE
    @RequestMapping("/notificari_user")
    public List<Notificare> getAllNotificariUser(@RequestParam int id_user) {
        return notificareDao.getAllNotificariUser(id_user);
    }

    @PutMapping("/mark_read_notification")
    public void markRead(@RequestParam int id){
        notificareDao.markRead(id);
    }

    @PutMapping("/mark_read_user")
    public void markReadUser(@RequestParam int id){
        notificareDao.markReadUser(id);
    }

    @DeleteMapping("/delete_notification")
    public void deleteNotification(@RequestParam int id){
        notificareDao.deleteNotification(id);
    }

    @DeleteMapping("/delete_notifications_user")
    public void deleteNotificationsUser(@RequestParam int id){
        notificareDao.deleteNotificationsUser(id);
    }



    /*
    @PostMapping("/test")
    public void test(){
        notificareDao.sendNotifications();
    }*/
}
