package com.diagnosis.cardoctor.controllerMongo;

import com.diagnosis.cardoctor.daoMongo.CodeDao;
import com.diagnosis.cardoctor.entityMongo.Codes;
import com.diagnosis.cardoctor.service.PartsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class CodeController {

    @Autowired
    private CodeDao codeDao;

    @Autowired
    private PartsService partsService;

    @GetMapping("/findAllNames")
    public List<Codes> getIgen() {

        // return codeCategories.getAllCodesWithTemporaryInfo();
        System.out.println(codeDao.findAllNames());
        return codeDao.findAllNames();

    }

    @GetMapping("/codeName/{name}")
    public Optional<Codes> getIgen2(@PathVariable String name) {

        // return codeCategories.getAllCodesWithTemporaryInfo();
        System.out.println(codeDao.findByCommand(name));
        return codeDao.findByCommand(name);

    }

    @GetMapping("/codeTypeAndUser/{type}/{username}")
    public List<Codes> getTypeAndUser(@PathVariable String type, @PathVariable String username) {

        // return codeCategories.getAllCodesWithTemporaryInfo();
        System.out.println(codeDao.findByTypeAndUser(type, username));
        return codeDao.findByTypeAndUser(type, username);

    }

    @GetMapping("/codeType/{type}")
    public List<Codes> getType(@PathVariable String type) {

        // return codeCategories.getAllCodesWithTemporaryInfo();
        System.out.println(codeDao.findByType(type));
        return codeDao.findByType(type);

    }


//    @GetMapping("/items/{name}")
//    public ResponseEntity<Codes> getItemByName(@PathVariable String name) {
//        return codeDao.findByCommand(name)
//                .map(ResponseEntity::ok) // if the item is found, return it
//                .orElseGet(() -> ResponseEntity.notFound().build()); // if not found, return 404
//    }


    @GetMapping("/codes")
    public List<Codes> getAllCodes() {


        return codeDao.findAll();
    }

@GetMapping("/codes/{username}")
    public List<Codes> getCodesByUsername(@PathVariable String username) {
        return codeDao.findByUsername(username);
    }


    @GetMapping("/getCodeByCommand/{id}")
    public Optional<Codes> getCodeById(@PathVariable String id) {
        return codeDao.findById(id);
    }



    @GetMapping("/getCodesByPart/{command}")
    public ResponseEntity<List<Map<String, Object>>> getRecommendedPart(@PathVariable String command) {
        return partsService.getRecommendedPart(command);

    }
    @GetMapping("/getCodesByPartAndUser/{command}/{username}")
    public ResponseEntity<List<Map<String, Object>>> getRecommendedPart(@PathVariable String command, @PathVariable String username) {
        return partsService.getRecommendedPartByUser(command, username);
    }

}
