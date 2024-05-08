package com.diagnosis.cardoctor.entityMongo;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document (collection = "userCars")
@Data
public class UserCars
{

    @Id
    private String id;
    private String username;
    private String carBrand;

    public void updateCode(UserCars newUserCar) {
        if (newUserCar.getUsername() != null) {
            this.username = newUserCar.getUsername();
        }
        if (newUserCar.getCarBrand() != null) {
            this.carBrand = newUserCar.getCarBrand();
        }


    }



    public void setCarBrand(String carBrand, String username) {
        this.carBrand = carBrand;
        this.username = username;
    }

}
