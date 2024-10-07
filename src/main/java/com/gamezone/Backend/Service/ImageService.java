package com.gamezone.Backend.Service;

import com.gamezone.Backend.Entity.Image;
import com.gamezone.Backend.Repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public Optional<Image> getImageById(Long id) {
        return imageRepository.findById(id);
    }

    public Image createImage(Image image) {
        return imageRepository.save(image);
    }

    public Image updateImage(Long id, Image imageDetails) {
        Image image = imageRepository.findById(id).orElseThrow(() -> new RuntimeException("Image not found"));
        // Update fields as necessary
        return imageRepository.save(image);
    }

    public void deleteImage(Long id) {
        imageRepository.deleteById(id);
    }
}
