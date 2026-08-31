  function changeValue( e ) {
    if(e.value == '0')
        e.value = '1';
    else
        e.value = '0';
        updateDecimal();
  }

 function updateDecimal() {
    var d = document.getElementById("decimalEquiv");
    var b128 = document.getElementById("b128");
    var b64 = document.getElementById("b64");
    var b32 = document.getElementById("b32");
    var b16 = document.getElementById("b16");
    var b8 = document.getElementById("b8");
    var b4 = document.getElementById("b4");
    var b2 = document.getElementById("b2");
    var b1 = document.getElementById("b1");
    var total = Number(b128.value)*128 + Number(b64.value)*64 + Number(b32.value)*32 + Number(b16.value)*16 + Number(b8.value)*8 + Number(b4.value)*4 + Number(b2.value)*2 + Number(b1.value);
    d.innerHTML = total; 
}


/* The HTML - table with decimal equivalents.
 * 
 * <table class="tableLarge">
       <tr>
          <th>Base 2:</th>
          <th>2<sup>7</sup></th>
          <th>2<sup>6</sup></th>
          <th>2<sup>5</sup></th>
          <th>2<sup>4</sup></th>
          <th>2<sup>3</sup></th>
          <th>2<sup>2</sup></th>
          <th>2<sup>1</sup></th>
          <th>2<sup>0</sup></th>
          <th><br></th>
          <th><br></th>
      </tr>
      <tr>
         <th>Decimal equivalent</th>
         <th>128</th>
         <th>64</th>
         <th>32</th>
         <th>16</th>
         <th>8</th>
         <th>4</th>
         <th>2</th>
         <th>1</th>
         <th><br></th>
         <th>Decimal number:</th>
      </tr>
      <tr>
         <td>Binary digits</td>
         <td><input value="0" onclick="changeValue(this);" id="b128" type="button"></td>
         <td><input value="0" onclick="changeValue(this);" id="b64" type="button"></td>
         <td><input value="0" onclick="changeValue(this);" id="b32" type="button"></td>
         <td><input value="0" onclick="changeValue(this);" id="b16" type="button"></td>
         <td><input value="0" onclick="changeValue(this);" id="b8" type="button"></td>
         <td><input value="0" onclick="changeValue(this);" id="b4" type="button"></td>
         <td><input value="0" onclick="changeValue(this);" id="b2" type="button"></td>
         <td><input value="0" onclick="changeValue(this);" id="b1" type="button"></td>
         <td><br></td>
         <td id="decimalEquiv">0</td>
      </tr>
   </table>
   */