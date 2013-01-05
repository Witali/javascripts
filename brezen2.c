/*
  Программный эмулятор широтно-импульсной модуляции базируется на алгоритме Брезенхема
  Равномерно распределяет нули и единицы на протяжении периода
*/

#include <stdio.h>

// длительность импульса (максимальное значение)
#define LENGTH 255

unsigned char brezen(unsigned char value){
  static unsigned char out[LENGTH];

  unsigned char oldVal = LENGTH/2;
  unsigned char newVal;
  unsigned char i=0;
  
  for(; i<LENGTH; ++i)
  {
    if(value >= LENGTH)
    {
      out[i] = 1;
    }
    else
    {
		newVal = (oldVal + value) % LENGTH;
		out[i] = newVal < oldVal ? 1 : 0;
		oldVal = newVal;
    
    }
    printf("%d", out[i]);
  }
  printf("\n");
  return out;
}


int main()
{
  brezen(0);
  brezen(5);
  brezen(25);
  brezen(254);
  brezen(255);
  return 0;
}