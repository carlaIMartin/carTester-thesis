package com.diagnosis.cardoctor.controllerMongo;

import com.diagnosis.cardoctor.daoMongo.CodeDao;
import com.diagnosis.cardoctor.entityMongo.Codes;
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
            // Execute Python script
            String result = executePythonScript(username);


            // Find all codes for the given username
            List<Codes> codes = codeDao.findAllByUsername(username);

            // Map to store codes grouped by the 'command' attribute
            Map<String, List<Codes>> commandMap = new HashMap<>();

            // Group codes by command attribute
            for (Codes code : codes) {
                commandMap.computeIfAbsent(code.getCommand(), k -> new ArrayList<>()).add(code);
            }

            // Process each command group
            for (List<Codes> codeList : commandMap.values()) {
                // Sort codes by order number to ensure the correct sequence
                codeList.sort(Comparator.comparingInt(Codes::getOrderNumber));


                // Reassign order numbers and remove rhe first element
                for (int i =0; i < codeList.size(); i++) {
                    codeList.get(i).setOrderNumber(i+1);

//                    if(codeList.get(i).getOrderNumber() >=3) {
//                        System.out.println("Element to delete is " + codeList.get(0).getId() + " with order number " + codeList.get(0).getOrderNumber());
//                        //remove the first element from codeList
//                        codeDao.deleteById(codeList.get(0).getId());


                        // fu important
//                        for (int j = 1; j < 3; j++) {
//                            System.out.println("Order number is " + codeList.get(j).getOrderNumber() + "and it becomes " + j);
//                            codeList.get(j).setOrderNumber(j);
//                            //modify the position in the list
//                            codeList.set(j-1, codeList.get(j));
//
//
//
//                        }
                        //System.out.println("First element is " + codeList.get(0).getId() + " we have to delete it");
                        //deleteById(codeList.get(0).getId());
//                        codeList.remove(0);
//                    }
//
//                }

//                if(codeList.size() >= 3) {
//                    //remove the first element from the db
//                    System.out.println(codeList.get(0).getId());
//                    codeDao.deleteById(codeList.get(0).getId());
//                    codeList.remove(0);
//                }
                    //move the rest of the codes one position up
//                for (int i = 0; i < codeList.size(); i++) {
//                    codeList.get(i).setOrderNumber(check + i);
               }
//
            }

//            for (Codes code : codes) {
//                if(code.getOrderNumber() >= 3) {
//                    // print the code with orderNumber 1
//                    System.out.println(code.getCommand());
//                    code.setOrderNumber(check - 1);
//
//                }
//                if(code.getOrderNumber() == 0) {
//
//                    codeDao.deleteById(code.getId());
//                }
//            }

            // Save updated codes
            for (Codes code : codes) {
                codeDao.save(code);
            }

            return ResponseEntity.ok(result); // Return the result from the script execution
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error executing script: " + e.getMessage());
        }
    }

    private String executePythonScript(String username) throws IOException, InterruptedException {
        ProcessBuilder processBuilder = new ProcessBuilder("D:/Anaconda3/python.exe", "D:\\LICENTA-CARDOCTOR\\scripts_backup\\scripts\\ok.py", username );
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
