package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


//@Data
@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String userName;

    private String password;

    private String roles;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User(Long id, String userName, String password, String roles, Date createDate) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.roles = roles;
        this.createDate = createDate;
    }

    public User(){};
}
