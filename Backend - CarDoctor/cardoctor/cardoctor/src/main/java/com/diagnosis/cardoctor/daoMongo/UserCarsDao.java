package com.diagnosis.cardoctor.daoMongo;

import com.diagnosis.cardoctor.entityMongo.Codes;
import com.diagnosis.cardoctor.entityMongo.UserCars;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserCarsDao extends MongoRepository<UserCars, String> {

    @Query(value="{ 'username' : ?0}", fields="{ 'carBrand' : 1, '_id' : 0, 'username' : 1}")
    List<UserCars> findCarByUsername(String username);
}