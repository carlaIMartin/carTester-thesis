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

    // Method modified to return a list of JSON-like objects for each code with a problem,
    // with the first "muie" key having an array of values
    public ResponseEntity<List<Map<String, Object>>> getRecommendedPart(String command) {
        List<Codes> codes = codeDao.findAll();
        List<Map<String, Object>> problems = new ArrayList<>();
        System.out.println("Command is " + command);

        for (Codes code : codes) {
            if (code.getProblem()) { // Check if the code has a problem
                Map<String, Object> problemDetails = new HashMap<>();

                // Handle "FUEL_INJECT_TIMING" command
                if (Objects.equals(command, "FUEL_INJECT_TIMING") && code.getCommand().equals("FUEL_INJECT_TIMING")) {
                    List<String> valuesFit = Arrays.asList("Fuel pump", "Fuel filter", "Fuel pressure regulator", "Fuel tank", "Fuel lines", "Fuel injectors", "Fuel rail");
                    problemDetails.put("code", "FUEL_INJECT_TIMING");
                    problemDetails.put("parts", valuesFit);
                }

                // Handle "CATALYST_TEMP" command
                if (Objects.equals(command, "CATALYST_TEMP") && code.getCommand().equals("CATALYST_TEMP")) {
                    List<String> valuesCT = Arrays.asList("Catalytic converter", "Oxygen sensor", "Fuel injectors", "Fuel rail");
                    problemDetails.put("code", "CATALYST_TEMP");
                    problemDetails.put("parts", valuesCT);
                }

                // Handle "EGR_ERROR" command
                if (Objects.equals(command, "EGR_ERROR") && code.getCommand().equals("EGR_ERROR")) {
                    List<String> valuesEGR = Arrays.asList("EGR valve", "EGR cooler", "EGR pipe", "EGR sensor");
                    problemDetails.put("code", "EGR_ERROR");
                    problemDetails.put("parts", valuesEGR);
                }

                // Handle "RPM" command
                if (Objects.equals(command, "RPM") && code.getCommand().equals("RPM")) {
                    List<String> valuesR = Arrays.asList("Crankshaft position sensor", "Camshaft position sensor", "Throttle position sensor", "Mass airflow sensor", "Engine control module");
                    problemDetails.put("code", "RPM");
                    problemDetails.put("parts", valuesR);
                }

                // Only add the problemDetails map to the problems list if it's not empty
                if (!problemDetails.isEmpty()) {
                    problems.add(problemDetails);
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
