<?php
//Basic sanitize of POST data
$_POST  = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);


//Extra bit of protection from someone trying to flood the post queries or not send any info at all
if (strlen($_POST['address']) > 128 || strlen($_POST['lat']) > 24 || strlen($_POST['lng']) > 24 || !isset($_POST['address']) || !isset($_POST['lat']) || !isset($_POST['lng'])){
    die();
}


//Open json file and add new data
$json = json_decode(file_get_contents("data.json"), true);
$newvalue = array('address' => $_POST['address'], 'lat' => $_POST['lat'], 'lng' => $_POST['lng']);
array_push($json, $newvalue);


//Save the contents back to the file
file_put_contents('data.json', json_encode($json, JSON_PRETTY_PRINT));

?>
