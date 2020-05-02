<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './api/vendor/autoload.php';
$config=[
    'settings'=>[
        'displayErrorDetails'=>true,
    "db" => [
        "host" => "127.0.0.1",
        "dbname" => "hermes",
        "user" => "root",
        "pass" => "usbw"
        ],
    ],
];

$app = new \Slim\App ($config);

// DIC configuration
$container = $app->getContainer();

// PDO database library 
$container ['db'] = function ($c) {
    $settings = $c->get('settings')['db'];
    $pdo = new PDO("mysql:host=" . $settings['host'] . ";dbname=" . $settings['dbname'],
        $settings['user'], $settings['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};
$app->get('/getdb/{idcheck}', function (Request $request, Response $response, array $args) {
    $id = $args['idcheck'];
    $sql = "Select * from guest_info join rooms
            on ginfo_room = room_id 
            join room_type
            on room_type = rtype_id
            join building
            on room_building = building_id
            join room_view
            on room_view = rview_id
            where ginfo_id='".$id."'";
    $sth = $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    
    return $this->response->withJson($sth);
});

$app->get('/getNewRoom/{idcheck}', function (Request $request, Response $response, array $args) {
    $id = $args['idcheck'];
    $sql = "Select * from rooms join room_type 
            on room_type = rtype_id
            join building
            on room_building = building_id
            join room_view 
            on room_view = rview_id
            where room_id ='".$id."'";
    $sth = $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    return $this->response->withJson($sth);
});

$app->get('/getRoom', function (Request $request, Response $response, array $args) {
    $sql = "Select * from rooms r join room_status rs on r.room_status = rs.rstatus_id where rs.rstatus_eng='Avaliable'";
    $sth = $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    return $this->response->withJson($sth);
});

$app->post('/updateRoom/{ginfo_id}/{old_room}/{new_room}', function (Request $request, Response $response, array $args) {
    $ginfo_id = $args['ginfo_id'];
    $old_room = $args['old_room'];
    $new_room = $args['new_room'];

    $sql = "UPDATE rooms SET room_status = '1' WHERE room_id = '$old_room'";
    $this->db->query($sql);
    $sql2 = "update guest_info
            set ginfo_room = '$new_room'
            where ginfo_id = '$ginfo_id' and ginfo_room='$old_room';";
    $this->db->query($sql2);
    $sql3 = "UPDATE rooms SET room_status = '2' WHERE room_id = '$new_room'";
    $this->db->query($sql3);
});

$app->run();
?>