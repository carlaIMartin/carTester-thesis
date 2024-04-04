package com.diagnosis.cardoctor.service;

import com.diagnosis.cardoctor.daoMongo.CodeDao;
import com.diagnosis.cardoctor.entityMongo.Codes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


public class CodeCategoriesService {


    private static CodeDao codeDao;

    List<Codes> codes = codeDao.findAll();



}

