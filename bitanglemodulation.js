// Bit Angle Modulation
// Альтернатива ШИМ



var out = [];
var inp = 253;
var maxBit = 7;
for(var i=0; i<256; i++)
{

  for(var bit=maxBit, mask, mask2; bit >=0; --bit)
  {
    mask = 1 << bit;
    mask2 = 1 << (maxBit - bit);
    if(i & mask2)
    {
      out.push(+(!!(inp & mask)))
      break;               
    }        
  }
    
}
console.log(out);