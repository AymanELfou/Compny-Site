<?php
$pdo = new PDO("mysql:host=127.0.0.1;dbname=jbr-digital", "root", "");
$tables = ["users", "projects", "chatbot_configs", "personal_access_tokens", "migrations"];
$sql = "-- JBR Digital MySQL Database Export\nSET FOREIGN_KEY_CHECKS=0;\n\n";
foreach ($tables as $t) {
    $create = $pdo->query("SHOW CREATE TABLE `$t`")->fetch(PDO::FETCH_ASSOC);
    $sql .= "DROP TABLE IF EXISTS `$t`;\n" . $create["Create Table"] . ";\n\n";
    $rows = $pdo->query("SELECT * FROM `$t`")->fetchAll(PDO::FETCH_ASSOC);
    if (!empty($rows)) {
        foreach ($rows as $row) {
            $cols = array_map(function($c) { return "`$c`"; }, array_keys($row));
            $vals = array_map(function($v) use ($pdo) { return is_null($v) ? "NULL" : $pdo->quote($v); }, array_values($row));
            $sql .= "INSERT INTO `$t` (" . implode(", ", $cols) . ") VALUES (" . implode(", ", $vals) . ");\n";
        }
        $sql .= "\n";
    }
}
$sql .= "SET FOREIGN_KEY_CHECKS=1;\n";
file_put_contents(__DIR__ . "/database/jbr-digital.sql", $sql);
echo "SQL_DUMP_SUCCESS\n";

