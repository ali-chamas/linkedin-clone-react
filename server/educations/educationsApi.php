<?PHP
 
 include("../db/connection.php");

 $request_method = $_SERVER["REQUEST_METHOD"];

 switch ($request_method) {
    case "GET":
        if(!empty($_GET["userID"])){
            $id = intval($_GET["userID"]);
            $response = getUserEducations($id);
            echo json_encode($response);
        }
        break;
    case "POST":
        
            $major=$_POST['major'];
            $university=$_POST['university'];
            $start_year=$_POST['start_year'];
            $end_year=$_POST['end_year'];
            $description=$_POST['description'];
            $userID=$_POST['userID'];
            


            $response = addEducation($major,$university,$start_year,$end_year,$description,$userID);
            echo json_encode($response);
            
        

        break;
   
    case 'DELETE':
        if(!empty($_GET["id"])){
            $id = intval($_GET["id"]);
            $response = deleteEducation($id);
            echo json_encode($response);
        }else{
            echo json_encode([
                "status"=>"something went wrong",
            ]);
        }
        break;

   
    
    default:
        echo json_encode([
            "status"=>"something went wrong",
        ]);
        break;
 }

 

 function getUserEducations($id){
    global $mysqli;
    $query = $mysqli->prepare('SELECT * from educations WHERE userID = ?');
    $query->bind_param('i', $id);
    $query->execute();
    $query->store_result();
    $num_rows=$query->num_rows();
    if($num_rows==0){
        $response['status']='Failed';
        $response['message']= 'no skiils available';
    }else{
        $educations = [];
        $query->bind_result($id, $major,$university,$start_year,$end_year,$description,$userID);
        while($query->fetch()){
            $education = [
                'id' => $id,
                'major'=>$major,
                'university'=> $university,
                'start_year'=> $start_year,
                'end_year'=> $end_year,
                'description'=> $description,
                'userID'=> $userID,
                
                
               
            ];

            $educations[] = $education;
        }
    }
        $response['status']='success';
        $response['educations']= $educations;
    
    return $response;
 }
 function addEducation($major,$university,$start_year,$end_year,$description,$userID){
    global $mysqli;
    $query = $mysqli->prepare('insert into educations(major,university,start_year,end_year,description,userID) values(?,?,?,?,?,?)');
    $query->bind_param('ssiisi', $major,$university,$start_year,$end_year,$description,$userID);
    if($query->execute()){
        $response['status']="success";
    }else{
        $response["status"]= "failed";
    }  
    return $response;
    
    
 }

 function deleteEducation($id){
    global $mysqli;
    $query = $mysqli->prepare("DELETE FROM educations WHERE id = ?");
    $query->bind_param("i", $id);
    $query->execute();
    $query->store_result();

    $response["status"] = "Success";

    return $response;
 }

 