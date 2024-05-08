package com.diagnosis.cardoctor.controllerMongo;

import com.diagnosis.cardoctor.daoMongo.CodeDao;
import com.diagnosis.cardoctor.daoMongo.UserCarsDao;
import com.diagnosis.cardoctor.entityMongo.Codes;
import com.diagnosis.cardoctor.entityMongo.UserCars;
import com.fasterxml.jackson.annotation.JsonIgnoreType;
import org.bson.types.Code;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

//import com.diagnosis.cardoctor.service.ScanService;


@RestController
public class ScanController {
int check = 1;
    @Autowired
    private CodeDao codeDao;

    @Autowired
    private UserCarsDao userCarsDao;

//    @PostMapping("/scanCodes")
//    public ResponseEntity<String> scanCodes() {
//        try {
//
//            String result = executePythonScript();
//            return ResponseEntity.ok(result); // Return the result from the script execution
//        } catch (IOException | InterruptedException e) {
//            e.printStackTrace();
//            return ResponseEntity.internalServerError().body("Error executing script: " + e.getMessage());
//        }
//    }

//    @PostMapping("/deleteCode/{orderNumber}")
//    public ResponseEntity<String> deleteCode(@PathVariable int orderNumber) {
//        try {
//            codeDao.deleteByOrderNumber(orderNumber);
//            return ResponseEntity.ok("Code with order number " + orderNumber + " deleted successfully.");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.internalServerError().body("Error deleting code: " + e.getMessage());
//        }
//    }


    @PostMapping("/registerUserCar/{userName}/{carBrand}")
    public ResponseEntity<String> registerUserCar(
            @PathVariable String userName,
            @PathVariable String carBrand) {

        // Create a new UserCars document with a unique ID
        UserCars userCar = new UserCars();
        userCar.setId(UUID.randomUUID().toString()); // Generate a unique identifier
        userCar.setUsername(userName);
        userCar.setCarBrand(carBrand);

        // Save the UserCars document in the database
        userCarsDao.save(userCar);

        // Return a response indicating success
        return ResponseEntity.ok("User car registered successfully with ID: " + userCar.getId());
    }



    @PostMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteById(@PathVariable String id)
    {
        try {
            codeDao.deleteById(id);
            return ResponseEntity.ok("Code with id " + id + " deleted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error deleting code: " + e.getMessage());
        }
    }
    @PostMapping("/scanCodes/{username}")
    public ResponseEntity<String> scanCodesUser(@PathVariable String username) {
        try {

            String result = executePythonScript(username);


            List<Codes> codes = codeDao.findAllByUsername(username);


            Map<String, List<Codes>> commandMap = new HashMap<>();


            for (Codes code : codes) {
                commandMap.computeIfAbsent(code.getCommand(), k -> new ArrayList<>()).add(code);
            }


            for (Map.Entry<String, List<Codes>> entry : commandMap.entrySet()) {
                List<Codes> codeList = entry.getValue();
                codeList.sort(Comparator.comparingInt(Codes::getOrderNumber));


                for (int i = 0; i < codeList.size(); i++) {
                    codeList.get(i).setOrderNumber(i + 1);
                }
            }


            for (Codes code : codes) {
                codeDao.save(code);
            }

            return ResponseEntity.ok(result);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error executing script: " + e.getMessage());
        }
    }

    private String executePythonScript(String username) throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder("D:/Anaconda3/python.exe", "D:\\LICENTA-CARDOCTOR\\scripts\\scanScript\\mainScan.py", username );
        Process process = processBuilder.start();
        StringBuilder output = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
        }

        try (BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
            String line;
            if ((line = errorReader.readLine()) != null) {
                StringBuilder errorOutput = new StringBuilder();
                do {
                    errorOutput.append(line).append("\n");
                } while ((line = errorReader.readLine()) != null);
                return "Error: " + errorOutput.toString();
            }
        }

        int exitVal = process.waitFor();
        if (exitVal == 0) {
            return output.toString();
        } else {
            return "Script execution failed with exit code: " + exitVal;
        }
    }




}
