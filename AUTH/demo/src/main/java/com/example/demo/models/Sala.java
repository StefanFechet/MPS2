package com.example.demo.models;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Represents an User for this web application.
 */
@Entity
@Table(name = "Sala")
public class Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int id;

    @NotNull
    public String nume;

    @NotNull
    public String facultate;

    @NotNull
    public String descriere;

    @NotNull
    public boolean stare;

    // ------------------------
    // PUBLIC METHODS
    // ------------------------

    public Sala() {
    }

    public Sala(int id) {
        this.id = id;
    }


    public Sala(String nume, String facultate, String descriere, boolean stare) {
        this.nume = nume;
        this.facultate = facultate;
        this.descriere = descriere;
        this.stare = stare;
    }


    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getFacultate() {
        return facultate;
    }

    public void setFacultate(String facultate) {
        this.facultate = facultate;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public boolean isStare() {
        return stare;
    }

    public void setStare(boolean stare) {
        this.stare = stare;
    }

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Sala{" +
                "id=" + id +
                ", nume='" + nume + '\'' +
                ", facultate='" + facultate + '\'' +
                ", descriere='" + descriere + '\'' +
                ", stare=" + stare +
                '}';
    }
}