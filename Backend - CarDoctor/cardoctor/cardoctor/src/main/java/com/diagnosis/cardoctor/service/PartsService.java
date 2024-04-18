package com.diagnosis.cardoctor.service;

import com.diagnosis.cardoctor.daoMongo.CodeDao;
import com.diagnosis.cardoctor.entityMongo.Codes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PartsService {

    @Autowired
    private CodeDao codeDao;

    public Object getObject() {
        Map<String, Object> object = new HashMap<>();
        object.put("key1", "value1");
        object.put("key2", "value2");
        return object;
    }



    public ResponseEntity<List<Map<String, Object>>> getRecommendedPartByUser(String command, String username) {
        List<Codes> codes = codeDao.findAll();
        List<Map<String, Object>> problems = new ArrayList<>();
        System.out.println("Command is " + command);
        Set<String> handledCommands = new HashSet<>();

        for (Codes code : codes) {
            if (code.getProblem() && code.getUsername().equals(username)) { // Check if the code has a problem and belongs to the user
                if (!handledCommands.contains(code.getCommand())) { // Process the command only if it hasn't been handled yet
                    Map<String, Object> problemDetails = new HashMap<>();
                    switch (code.getCommand()) {
                        case "FUEL_INJECT_TIMING":
                            if (Objects.equals(command, "FUEL_INJECT_TIMING")) {
                                List<String> valuesFit = Arrays.asList("Fuel pump", "Fuel filter", "Fuel pressure regulator", "Fuel tank", "Fuel lines", "Fuel injectors", "Fuel rail");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesFit);
                            }
                            break;
                        case "CATALYST_TEMP":
                            if (Objects.equals(command, "CATALYST_TEMP")) {
                                List<String> valuesCT = Arrays.asList("Catalytic converter", "Oxygen sensor", "Fuel injectors", "Fuel rail");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesCT);
                            }
                            break;
                        case "EGR_ERROR":
                            if (Objects.equals(command, "EGR_ERROR")) {
                                List<String> valuesEGR = Arrays.asList("EGR valve", "EGR cooler", "EGR pipe", "EGR sensor");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesEGR);
                            }
                            break;
                        case "RPM":
                            if (Objects.equals(command, "RPM")) {
                                List<String> valuesR = Arrays.asList("Crankshaft position sensor", "Camshaft position sensor", "Throttle position sensor", "Mass airflow sensor", "Engine control module");
                                problemDetails.put("code", code.getCommand());
                                problemDetails.put("parts", valuesR);
                            }
                            break;
                    }
                    // Only add the problemDetails map to the problems list if it's not empty
                    if (!problemDetails.isEmpty()) {
                        problems.add(problemDetails);
                        handledCommands.add(code.getCommand()); // Mark this command as handled
                    }
                }
            }
        }
        if (problems.isEmpty()) {
            // If no codes with problems were found, return an appropriate response
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            // Return the list of problems, wrapped in a ResponseEntity
            return new ResponseEntity<>(problems, HttpStatus.OK);
        }
    }
}
