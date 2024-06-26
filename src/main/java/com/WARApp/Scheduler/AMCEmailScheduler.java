package com.WARApp.Scheduler;

import com.WARApp.Model.LAPTOP;
import com.WARApp.Service.LaptopService;
import com.WARApp.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class AMCEmailScheduler {

    @Autowired
    private LaptopService laptopService;

    @Autowired
    private EmailService emailService;

    @Scheduled(cron = "0 0 10 * * ?") // Run daily at 12:00 PM
    public void sendAMCEmails() {
        LocalDate sevenDaysFromNow = LocalDate.now().plusDays(7);
        List<LAPTOP> laptops = laptopService.findLaptopsWithAMCEndDate(sevenDaysFromNow);

        for (LAPTOP laptop : laptops) {
            sendEmailToUsers(laptop);
        }
    }

    private void sendEmailToUsers(LAPTOP laptop) {
        String recipientEmail = "rajareddy.buddepu@waisl.in";
        String subject = "AMC End Date Reminder";
        String message = "Dear User,\n\nThe AMC for your laptop (Serial Number: " + laptop.getSerial_number() + ") will end on "
                + laptop.getAmc() + ". Please take necessary actions.\n\nRegards,\nInventory Management System";

        emailService.sendEmail(recipientEmail, subject, message);
    }
}
