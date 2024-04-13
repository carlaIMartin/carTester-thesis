package com.diagnosis.cardoctor.daoMongo;

import com.diagnosis.cardoctor.entityMongo.Codes;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CodeDao extends MongoRepository<Codes,String> {

    @Query(value="{}", fields="{ 'command' : 1, '_id' : 0 }")
    List<Codes> findAllNames();

    @Query(value="{ 'command' : ?0 }", fields="{ 'command' : 1, '_id' : 1, response_code : 1, description : 1, timestamp : 1, type : 1, problem : 1}")
     Optional<Codes> findByCommand(String command);

    @Query(value="{ 'type' : ?0 }", fields="{ 'command' : 1, '_id' : 1, response_code : 1, description : 1, timestamp : 1, type : 1, problem : 1}")
    List<Codes> findByType(String type);

    @Query(value="{'username' :  ?0}", fields="{ 'command' : 1, '_id' : 0,  response_code : 1, description : 1, timestamp : 1, type : 1, problem : 1}")
    List<Codes> findByUsername();

}