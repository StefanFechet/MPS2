package com.example.demo.controllers;

import com.example.demo.dao.RezervareDao;
import com.example.demo.dao.SalaDao;
import com.example.demo.dao.UserDao;
import com.example.demo.models.Rezervare;
import com.example.demo.models.Sala;
import com.example.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class MainController {

    @Autowired
    private SalaDao salaDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private RezervareDao rezervareDao;

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

    @RequestMapping("/istoric")
    public List<Rezervare> getRoomHistory(@RequestParam int id) {
        rezervareDao.updateSalaStatus();
        return rezervareDao.getAllBookingsWithID(id);
    }

    @PostMapping("/new_booking")
    public void makeBooking(@RequestParam int id_sala, @RequestParam int id_user, @RequestParam String start, @RequestParam String finish, String motiv) {
        Rezervare rezervare = new Rezervare(id_sala, id_user, Timestamp.valueOf(start), Timestamp.valueOf(finish), motiv);
        rezervareDao.updateSalaStatus();
        rezervareDao.makeBooking(rezervare);
        rezervareDao.updateSalaStatus();
    }
}
