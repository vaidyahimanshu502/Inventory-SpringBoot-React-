package com.example.demo.controller;

import com.example.demo.model.*;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.ItemRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ItemController 
{
    
    @Autowired
    ItemRepository itemRepository;

    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems(@RequestParam(required = false) String itemName) 
    {
        try {
            List<Item> items = new ArrayList<Item>();
            if(itemName == null)
            {
                itemRepository.findAll().forEach(items::add);
            } else 
            {
                itemRepository.findByItemName(itemName).forEach(items::add);
            }
            if(items.isEmpty())
            {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(items, HttpStatus.OK);
        } catch (Exception e) {
           return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<Item> getMethodName(@PathVariable("id") long id) 
    {
        try 
        {
            Optional<Item> itemData = itemRepository.findById(id);
            if(itemData.isPresent())
            {
                return new ResponseEntity<>(itemData.get(), HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/items")
    public ResponseEntity<Item> postItem(@RequestBody Item item) 
    {
        try {
           Item _item = itemRepository.save(new Item(item.getItem_name(), item.getItem_desc(), item.getPrice())); 
           return new ResponseEntity<>(_item, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<Item> putUpdateItem(@PathVariable("id") long id, @RequestBody Item item) {
        try {
            Optional<Item> itemData = itemRepository.findById(id);
            if(itemData.isPresent()) {
                Item _item = itemData.get();
                _item.setItem_name(item.getItem_name());
                _item.setItem_desc(item.getItem_desc());
                _item.setPrice(item.getPrice());

                return new ResponseEntity<>(itemRepository.save(_item), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Item> deleteSelectedItem(@PathVariable("id") long id)
    {
        try {
            itemRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
