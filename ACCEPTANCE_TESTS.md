# DCU Acceptance Tests

Run automated acceptance checks with `npm test`. Manual pre-LIVE checks must be executed in a Google Workspace test deployment using only clearly fake TEST patients.

1. Book Iron Sucrose on Friday with 9 existing fake bookings; expect accepted.
2. Add the 11th Iron Sucrose on Friday; expect Alternative Offered and nurse confirmation required.
3. Book Ferinject within limit 10; expect accepted.
4. Fill weekend total to 20; expect next booking rejected for that day.
5. Add third First Dose on weekend; expect FIRST_DOSE_FULL.
6. Try IVIG on Friday; expect blocked.
7. Try Iron Sucrose on Sunday; expect blocked.
8. Add 21st weekday patient; expect blocked.
9. Add third weekday procedure; expect blocked.
10. Add third IVIG weekday; expect blocked.
11. Add third Desferal weekday; expect blocked.
12. Add third Blood Transfusion weekday; expect blocked.
13. Add third weekday First Dose; expect blocked.
14. Re-run same MRN + date + MedicationID; expect no second booking row.
15. Submit arrival with Treatment Status Not Given; expect no future booking.
16. Override calculated date without reason; expect validation error.
17. Change appointment; expect old row remains with Changed and new row references old.
18. Manual appointment appears as Manual Addition in Daily Huddle alerts.
19. Doctor account sees only mapped specialty.
20. User missing from Users Roles receives Access Denied.
21. Use ScheduleID for another medication; expect rejection.
22. Insert blank row then update a record; expect correct sheet row updated.
23. Create booking; expect Audit Log row with Booking entity.
24. Simulate old-booking update failure; expect old remains active and new Need Review/incident audit.
25. Blood Transfusion and Paracentesis honor approved schedule No Next Appointment.
26. Selecting a new schedule replaces Interval Number and Interval Unit.
27. Create overlapping Capacity Rules; expect setup Need Review rather than choosing first rule.
28. Late arrival closes No Arrival Log and huddle updates.
29. Re-run install/migrate; expect Medication Master local edits preserved by migrate.
30. Call doctor dashboard API for another specialty directly; expect forbidden.
31. Pending and Need Review excluded from monthly output and official huddle list.
32. Run two concurrent final-seat requests; expect one booking only.
33. Form B Required without approved status/number blocks Ready.
34. Monthly update edits only the affected DATE block.
35. Confirm 2026/2027 February has 28 days and 29 Feb is rejected.
