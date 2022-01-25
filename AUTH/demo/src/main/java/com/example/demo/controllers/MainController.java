package com.example.demo.controllers;

import com.example.demo.dao.*;
import com.example.demo.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class MainController {

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
}
