#include <LowPower.h>
#include <CapacitiveSensor.h>

/*
 * ECE Capstone Project - FreeSeats
 * William Foy, Jonathan Cheng, Nathan Ang
 * Fall 2021
 */


CapacitiveSensor cs_4_2 = CapacitiveSensor(4,2);        // 10 megohm resistor between pins 4 & 2, pin 2 is sensor pin, add wire, foil
long baseline_avg = 0;
const int id = 2;
bool occupy = true;

void setup()                    
{
   cs_4_2.set_CS_AutocaL_Millis(0xFFFFFFFF);     // turn off autocalibrate on channel 1 - just as an example
   Serial.begin(9600);
   long avg = 0;
   for(int i = 0; i < 20; i++) {
    long tot = cs_4_2.capacitiveSensor(30);
//    Serial.print(tot);
//    Serial.print(" ");
    avg += tot;
    delay(500);
   }
   baseline_avg = avg/20;
//   char buf[50];
//   sprintf(buf, "BASELINE = %lu\n", baseline_avg);
//   Serial.print(buf);
}

void loop()                    
{
    int occupied = 0;
    int empty = 0;
    for(int i = 0; i < 8; i++) {
      long total1 =  cs_4_2.capacitiveSensor(30);
      if (total1 > (baseline_avg * 15)) {
          occupied++;
      } else {
          empty++;
      }
      delay(125);
    }
    char buf[20];
    if (occupied >= 7 && !occupy) {
      sprintf(buf, "%d, OCCUPIED, %d\n", id, occupied);
      Serial.print(buf);
      occupy = true;
      delay(50);
    } else if (empty >= 7 && occupy) {
      sprintf(buf, "%d, EMPTY, %d\n", id, empty);
      Serial.print(buf);
      occupy = false;
      delay(50);
    }
    LowPower.powerDown(SLEEP_4S, ADC_OFF, BOD_OFF);  
}
