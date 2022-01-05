package com.example.demo.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    @NotNull
    String nume;
    @NotNull
    String prenume;
    @NotNull
    boolean permisiune;
    @NotNull
    String mail;
    @NotNull
    String parola;

    public User(String nume, String prenume, boolean permisiune, String mail, String parola) {
        this.nume = nume;
        this.prenume = prenume;
        this.permisiune = permisiune;
        this.mail = mail;
        this.parola = parola;
    }

    public User() {
        this.id = -1;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getPrenume() {
        return prenume;
    }

    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }

    public boolean getPermisiune() {
        return permisiune;
    }

    public void setPermisiune(boolean permisiune) {
        this.permisiune = permisiune;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getParola() {
        return parola;
    }

    public void setParola(String parola) {
        this.parola = parola;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", nume='" + nume + '\'' +
                ", prenume='" + prenume + '\'' +
                ", permisiune=" + permisiune +
                ", mail='" + mail + '\'' +
                ", parola='" + parola + '\'' +
                '}';
    }
}
