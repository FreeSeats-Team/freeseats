#include <CapacitiveSensor.h>

/*
 * ECE Capstone Project - FreeSeats
 * William Foy, Jonathan Cheng, Nathan Ang
 * Fall 2021
 */


CapacitiveSensor cs_4_2 = CapacitiveSensor(4,2);        // 10 megohm resistor between pins 4 & 2, pin 2 is sensor pin, add wire, foil
long baseline_avg = 0;
int occupied;
int empty;

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
   occupied = 0;
   empty = 0;
}

void loop()                    
{
    long total1 =  cs_4_2.capacitiveSensor(30);

    //Serial.print(total1);                  // print sensor output 1
    //Serial.print("\n");
    if (total1 > (baseline_avg * 15) && occupied != 4) {
        occupied++;
        if (occupied == 4) {
          char buf[50];
          sprintf(buf, "2, OCCUPIED, %lu\n", total1);
          Serial.print(buf);
          empty = 0;
        }
    } else if (total1 < (baseline_avg * 10) && empty != 4) {
        empty++;
        if (empty == 4) {
          char buf[50];
          sprintf(buf, "2, EMPTY, %lu\n", total1);
          Serial.print(buf);
          occupied = 0;
        }
    }
    

    delay(500);                             // arbitrary delay to limit data to serial port 
}
