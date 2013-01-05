// json-rpc �������� 
// �������� ��������� ����������� ����� ��������� �� ������

function ajaxQueue(config)
{
 
 var global = config.global || window;
 var transactionId = config.startId || 0;
 var trStart = config.startId || 0;
 var defTimeout = 2000;
 var storePrefix = config.storePrefix || 'ajax-queue-';
 var transfer = false; // ���� �� �������� ������, true �� ����� �������
 var resync = false; // ���� ������ �� ������������� ������ �� ����� ������ � ��������
 
 
 var store = window.localStorage;
 
 
 
 
 this.send = function send(data, timeout)
 {
     store[storePrefix + transactionId] = JSON.stringify(data);
     transactionId++;
     
     if(timeout !== false)
     {
         setTimeout(sync, timeout ? timeout : defTimeout );
     }
 }
 
 
 //
 function onComplete(st, end, reqData, respData)
 {
     var i=0, n = end-st;
     trStart = end + 1;


    // ��������� ��������
     for(; i < n; ++i)
     {
         var cb = reqData[i].callback;
         
         if(typeof global[cb] == 'function')
         {
            global[cb].apply(global, [respData.toSource()]);
         }
        
        
        // ������� ��������� ������
        delete store[storePrefix + (st+i)];
     }
     

    if(resync) // ���� ��� ������ �� ������������� �� ����� ������ � ��������
    {
        resync = false;
        sync();
    }
 
  }
 
 this.sync = function sync()
 {
    if(transfer)
    {
        resync = true;
        return;
    };
 

     if(transactionId > trStart)
     {
         var st=trStart,
            i=trStart,
            req,
            data = [], // ������ �������������� ��� ��������
            localData = [],
            end = transactionId;
            
        transfer = true;         
         for(; i < end; ++i)
         {
             req = JSON.parse(store[storePrefix + i]);
             localData.push(req);
             data.push({
                 "jsonrpc": "2.0",
                 "method": req.url,
                 "params": [req.data],
                 "id": i
             });
         }
         
         $.ajax({
             url: '/echo/json/',
             data: {
                 json: JSON.stringify(data)
             },
             type: 'POST',
             success: function(resp, textStatus, jqXHR){
                 transfer = false; // �������� ���������
                 onComplete(st, end, localData, resp);
             
             }
         });
         
 
         
     }
 }
 

 
 
}

