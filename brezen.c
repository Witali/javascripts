#include <stdio.h>

unsigned char brezen(unsigned char value){
  static unsigned char out[256];

  unsigned char oldVal = 128; // смещение битовой последовательности
  unsigned char newVal;
  int i=0;
  
  for(; i<256; ++i)
  {
    newVal = oldVal + value;
    out[i] = newVal < oldVal ? 1 : 0;
    oldVal = newVal;
    printf("%d", out[i]);
  }
  
  return out;
}


int main()
{
  brezen(224);
  return 0;
}