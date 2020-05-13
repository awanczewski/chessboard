var btnLoad = document.getElementById("load");
var btnDisplay = document.getElementById("display");
var btnReset = document.getElementById("reset");
var btnRandom = document.getElementById("random");
var textArea = document.getElementById("textarea");
var btnEmpty = document.getElementById("empty");
var xmlFile = 
btnLoad.onclick = function()
{
    var xmlhttp;
    if(window.XMLHttpRequest)
    {
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {
          textArea.value = this.responseText;
        }
    };
    xmlhttp.open("GET", "xml/position.xml", true);
    xmlhttp.send();

}
btnDisplay.onclick = function()
{
    var parser, xmlDoc;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(textArea.value, "text/xml");
    var chess = xmlDoc.getElementsByTagName("chess")
    var color = xmlDoc.getElementsByTagName("color")
    var position = xmlDoc.getElementsByTagName("position")
    for(i = 0; i < chess.length; i++)
    {
        if(chess[i].getAttribute('type') == "pawn")
        {
           if(color[i].childNodes[0].nodeValue == "BLACK")
           {   
                document.getElementById(position[i].childNodes[0].nodeValue).innerHTML = "&#9823;";
           }
           else if(color[i].childNodes[0].nodeValue == "WHITE")
           {
                document.getElementById(position[i].childNodes[0].nodeValue).innerHTML = "&#9817;";
           }
        }

        else if(chess[i].getAttribute('type') == "knight")
        {
           if(color[i].childNodes[0].nodeValue == "BLACK")
           {   
                document.getElementById(position[i].childNodes[0].nodeValue).innerHTML = "&#9822;";
           }
           else if(color[i].childNodes[0].nodeValue == "WHITE")
           {
                document.getElementById(position[i].childNodes[0].nodeValue).innerHTML = "&#9816;";
           }
        }

        else if(chess[i].getAttribute('type') == "bishop")
        {
           if(color[i].childNodes[0].nodeValue == "BLACK")
           {   
                document.getElementById(position[i].childNodes[0].nodeValue).innerHTML = "&#9821;";
           }
           else if(color[i].childNodes[0].nodeValue == "WHITE")
           {
                document.getElementById(position[i].childNodes[0].nodeValue).innerHTML = "&#9815;";
           }
        }

        else if(chess[i].getAttribute('type') == "rock")
        {
           if(color[i].childNodes[0].nodeValue == "BLACK")
           {   
                document.getElementById(position[i].childNodes[0].nodeValue).innerHTML = "&#9820;";
           }
           else if(color[i].childNodes[0].nodeValue == "WHITE")
           {
                document.getElementById(position[i].childNodes[0].nodeValue).innerHTML = "&#9814;";
           }
        }

        else if(chess[i].getAttribute('type') == "queen")
        {
           if(color[i].childNodes[0].nodeValue == "BLACK")
           {   
                document.getElementById(position[i].childNodes[0].nodeValue).innerHTML = "&#9819;";
           }
           else if(color[i].childNodes[0].nodeValue == "WHITE")
           {
                document.getElementById(position[i].childNodes[0].nodeValue).innerHTML = " &#9813;";
           }
        }

        else if(chess[i].getAttribute('type') == "king")
        {
           if(color[i].childNodes[0].nodeValue == "BLACK")
           {   
                document.getElementById(position[i].childNodes[0].nodeValue).innerHTML = "&#9818;";
           }
           else if(color[i].childNodes[0].nodeValue == "WHITE")
           {
                document.getElementById(position[i].childNodes[0].nodeValue).innerHTML = "&#9812;";
           }
        }

        else
        {
             alert("WRONG SYNTAX");
             break;
        }
    }
}

btnReset.onclick = function()
{
    for(i = 65; i < 73; i++) //Using ASCII table to make the code much simpler.
    {
        for(j = 1; j < 9; j++)
        {
            document.getElementById(String.fromCharCode(i) + j).innerHTML = "";
        }
    }

}

btnRandom.onclick = function()
{
     var cordOne, cordTwo, color, type;
     var i = 10;
     textArea.value = "<chessboard> \n \n"
     while(i > 0)
     {    
          cordOne = Math.floor((Math.random() * 8) + 65);
          cordTwo = Math.floor((Math.random() * 8) + 1);
          if(!(textArea.value.includes('<position>' + (String.fromCharCode(cordOne) + cordTwo) + '</position>')))
          {
               i = i - 1; //Only if there isn't the same position in textarea then I can count that as a correctly generated. Thats why I use while because i am not sure how many times I will need to use the loop.
               color = Math.floor((Math.random() * 2) + 1); 
               type = Math.floor((Math.random() * 6) + 1);        
              
               if(color == 1)
               {
                    color = "BLACK";
               }
               else if(color == 2)
               {
                    color = "WHITE";
               }

               switch(type)
               {
                    case 1:
                         type = "pawn";
                         break;
                    case 2:
                         type = "knight"
                         break;
                    case 3:
                         type = "bishop";
                         break;
                    case 4:
                         type = "rock";
                         break;
                    case 5:
                         type = "queen";
                         break;
                    case 6:
                         type = "king";
                         break;
               }

               textArea.value += '<chess type="' + type + '"> \n <color>' + color + '</color> \n <position>' + (String.fromCharCode(cordOne) + cordTwo) + '</position> \n</chess> \n \n';
          }   
     }
     textArea.value += "\n</chessboard>";
}

btnEmpty.onclick = function()
{
     var temp;
     if((textArea.value == ""))
     {
          textArea.value = '<chessboard>\n \n<chess type="">\n <color></color>\n <position></position>\n</chess>\n\n</chessboard>';
     }
     else
     {
          temp = textArea.value;
          temp = temp.replace("</chessboard>", "");
          textArea.value = temp + '<chess type="">\n <color></color>\n <position></position>\n</chess>\n\n</chessboard>';
     }
     
}