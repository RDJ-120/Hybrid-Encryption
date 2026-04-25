import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import fs from 'fs';
import crypto from 'crypto';
import path from "path";
import ps from "prompt-sync";
import chalk from "chalk";

let input = ps();

function clear() {
    process.stdout.write('\x1Bc');
}

function banner() {
let sec = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⠀⠀⠀⠀⢢⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢘⡄⠀⠀⠀⠀⢃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠃⠀⠀⠀⠀⢨⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡸⠀⠀⠀⠀⠀⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⢁⠂⠀⠀⠀⠀⠀⢠⣆⠀⠀⠀⠀⠀⢀⠔⠉⠠⠉⠰⡘⢠⠍⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⣰⠎⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠎⠀⠀⠀⠁⠀⢯⢄⠴⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠺⠆⠈⠃⣮⡁⠀⠀⠀⢀⡞⢀⠀⠀⠀⠀⠀⠯⠇⠀⡀⠀⠀⠀⠸⡧⢛⠩⠑⡀⢠⣸⠀⡠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠟⠀⣸⡷⠀⠀⠀⡼⠀⠀⢡⠀⠀⣤⣤⠀⠀⠨⣿⠆⠀⠀⠀⠑⠤⠤⠜⠁⢰⠃⠐⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠘⣗⠀⠀⠠⡇⠀⠀⢸⠀⣠⠌⠉⠀⠀⠀⠀⠀⠀⠾⠀⠀⠀⠀⠀⡂⡞⠄⡸⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠋⠀⠶⡀⠀⠀⠀⠀⢻⡄⠀⠀⢗⡀⠀⣸⠀⠰⡲⠀⠿⠀⠀⠀⣴⡵⠀⠀⠀⠀⠀⢐⡜⡀⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠆⠠⣶⠀⠠⠶⠠⣦⠈⢳⣠⠀⠈⣆⠀⡯⠀⠀⣦⠀⡈⢀⣤⡄⠀⠀⠀⠀⠀⠀⢠⠞⠊⠀⠀⠈⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡆⠀⠀⢀⣤⡀⢖⡄⠀⠀⠀⠀⠹⣆⡀⠙⡂⢰⡀⠀⠀⣠⣷⣆⠉⠐⠀⠻⠗⠀⠀⡰⠋⢀⡔⠀⢲⡀⠀⣏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢷⣀⠀⠈⠋⠀⣀⠀⠀⠀⠀⣁⡐⢈⡳⡂⠹⡄⢧⢂⣸⠹⢋⢠⢣⢳⣠⠀⠀⣡⠎⠀⠀⠘⣧⢒⠘⢀⡠⠋⢀⡀⣀⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⢦⡀⠀⠀⠘⠁⠀⠠⢸⣿⡍⠻⠒⢿⣦⠹⡄⢻⡟⠀⠘⡀⠘⣠⡣⣠⠞⠁⠀⠀⠀⠀⢈⠈⢉⠁⠀⠀⠈⢁⠙⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠶⡼⣕⠲⠦⢤⣀⣀⠘⢿⡵⡂⠀⠀⠉⠑⢎⣿⠁⠀⠀⠀⡆⣿⢾⡫⠠⣀⣤⡴⠿⢛⠿⡿⣿⠆⠀⣀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⢶⣬⡳⣲⠢⣍⢳⡀⣷⠁⠀⡀⠀⠀⠄⢿⡀⠀⠀⠠⠁⣿⢽⣴⠿⠛⠁⠀⠈⠀⣰⡷⢁⠔⡪⠂⠐⢀⣨⠖⠂⠉⠉⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠍⠉⢛⠳⢔⣧⠘⣧⠀⢄⠀⡀⠀⠚⡷⠁⠀⠀⣰⣿⠏⠑⠠⠀⠀⠀⠠⣪⢟⣴⣗⣁⠦⠴⠛⣉⢀⡀⢤⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⢴⡲⣞⢲⣒⡲⢤⡤⢬⢆⡙⠷⡌⠳⣄⠂⠀⠀⠂⠶⡄⢠⣆⡿⠁⠀⠀⠀⢠⠔⠈⡡⢃⠊⠔⠀⠁⠐⠊⠽⣂⠉⠈⠑⠨⡺⡄⡀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢠⠜⣃⣨⡧⡽⠞⠙⠓⠚⠑⠘⠚⠓⠤⡵⢠⣛⡲⣦⡀⢤⡔⣷⡜⣿⣡⡀⠐⠀⢀⢨⣠⣖⣑⠚⠶⢶⡶⢖⡤⠤⣄⠉⠐⠂⠐⠂⠓⠳⣅⠀
⠀⠀⠀⠀⠀⠀⠀⣠⣿⠲⠋⠁⠀⢀⡤⣲⠲⠆⢶⠻⠖⢚⡴⠞⠉⠈⠀⠍⠻⣛⢯⣽⣻⡣⠯⠴⣶⠍⠉⠉⠀⠊⠉⠉⢟⣶⣌⡳⣬⡛⣦⠝⡄⠀⠀⠀⠀⠀⠀⠑
⠀⠀⠀⢀⣀⠤⠞⠋⠁⠀⠀⢀⠔⠃⡡⠴⣱⠖⠉⠠⣰⣏⡤⠊⡀⠚⢁⠀⠐⣴⢯⣭⣾⢮⢮⡹⢶⠆⠀⠐⢀⠀⠈⠀⢢⣘⡹⣿⣿⡝⢶⣽⢻⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠋⣤⣪⡴⠋⠁⠀⠠⣺⣿⠝⣀⢀⡠⢉⣀⣠⣦⣴⠿⢻⠃⠡⠁⢌⠢⡂⠴⢄⠠⠤⠄⠴⠦⣔⣺⣿⣯⡙⠆⢻⣾⠀⠀⠀⢠⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣀⣴⣿⡿⠞⠋⠁⠀⠀⠐⠑⠀⣿⣯⣴⢾⢿⣿⢿⣿⣿⢿⠏⠠⠁⡐⠀⡀⠰⠌⢷⣦⣶⡧⣤⡶⠚⢛⢛⠋⢩⢲⠀⠀⢸⡇⠀⠀⣀⡀⠃⠀⠀
⠀⠀⠀⠀⠈⠉⠋⠉⠉⠀⠀⠀⠀⠀⠀⠀⢨⡴⢇⣧⡁⠒⠛⠹⣹⡿⢋⢿⣾⡇⣘⡀⠄⠀⠄⠁⡚⠼⢟⠮⣿⡹⢺⣧⣛⢊⢁⣀⠁⠸⠛⠜⣀⠀⢀⡉⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⡏⠘⢇⢸⠏⠀⣬⡾⣿⣹⢛⣦⣾⢿⣌⢇⡘⠄⠘⡀⣷⣿⣃⠀⠈⠳⣏⣀⠙⡲⣌⠋⠉⣎⠆⠀⣉⡴⠊⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠃⠀⠞⠂⠀⠀⢻⣆⣀⣀⡠⣾⡟⠀⡀⠿⢦⡙⢫⢼⢟⣾⣶⢣⣰⢿⣾⠟⠈⠹⢦⡀⠙⣮⢥⠀⠨⡳⣜⠁⡖⢆⠲⠃⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣾⡇⠀⠀⠀⠀⠈⠉⠉⣸⡟⢀⢙⠋⠀⢈⣁⡘⠛⠐⠹⣻⣿⢿⣿⠏⠀⠀⠀⠠⢿⡀⢈⢧⠓⠀⠘⠝⣷⣌⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⡀⣿⠁⡀⠀⠀⠀⠈⠋⠂⠀⠀⠀⠁⠙⠹⠘⠀⠀⠀⠀⠀⠙⡇⠀⢹⣧⠀⠀⠈⢌⣿⡆⢃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣌⡁⣷⠉⠤⠤⢠⡴⠶⣶⣤⠀⠀⠀⠀⠀⠀⠀⠀⢲⠆⣤⡟⠀⡇⠀⢈⢻⡄⠀⠀⠀⢻⣷⡜⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣷⢻⡀⠀⠢⢺⣩⡇⠀⢹⡆⠀⠀⠀⠀⠀⠀⠀⠐⢆⡉⠡⠞⠀⠀⠘⣸⡇⠀⠀⠀⠀⣿⣱⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⡼⠳⣤⣀⠄⣂⣀⡤⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⢰⣿⡇⠆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠁⢏⠨⣯⠉⠹⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠁⠀⠀⠀⢸⣿⠄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣾⠋⠀⠀⠀⠀⣾⡿⠌⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⠇⠀⠀⠀⠀⠀⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠖⠉⠀⠀⠀⠀⠀⢀⣾⣿⠂⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⢤⣾⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢤⣤⣶⡿⠞⠟⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`
console.log(chalk.cyan.bold(sec));
};

function checkRSA(choice) {
if (choice==false) {
banner();
let {publicKey, privateKey} = crypto.generateKeyPairSync("rsa", {modulusLength: 2048});
fs.writeFileSync("public.pem", publicKey.export({type: "pkcs1", format: "pem"}), "utf-8");

fs.writeFileSync("private.pem", privateKey.export({type: "pkcs1", format: "pem"}), "utf-8")
console.log(chalk.cyan.bold("\n\nRSA Keys Successfully Saved To:\nPublic: public.pem\nPrivate: private.pem"));
input(chalk.green.bold("Press Enter To Continue(TO AES):  "));
return [publicKey, privateKey];
} else if (choice==true) {
clear();
banner();
let pubpath = input(chalk.cyan.bold("Enter The RSA Public key filepath: "));
let privpath = input(chalk.cyan.bold("Enter The RSA Private key filepath: "));
if (!fs.existsSync(pubpath) || !fs.existsSync(privpath)) {
console.log(chalk.red("Some paths not found!"));
process.exit(0);
};
let pub = fs.readFileSync(pubpath, "utf-8");
let priv = fs.readFileSync(privpath, "utf-8");
pub = crypto.createPublicKey(pub)
priv = crypto.createPrivateKey(priv)
return [pub, priv];
}};

function check(ans, pubkey, privkey) {
if (ans==true) {
clear();
banner();
let key_file = input(chalk.cyan.bold("Enter the AES key filepath: ")).trim();

if (fs.existsSync(key_file)) {
let key = fs.readFileSync(key_file);

key = crypto.privateDecrypt(
  {
    key: privkey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
  },
  Buffer.from(key)
);

return [key];
}
} else if (ans==false) {
clear();
let key = crypto.randomBytes(32);
let enckey = crypto.publicEncrypt({key: pubkey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING}, Buffer.from(key));
banner();
let key_file = input(chalk.cyan.bold("Enter The Key Filepath To Save in: ")).trim();

fs.writeFileSync(key_file, enckey);

return [key];
};
};

async function encfile(target, key) {
    await new Promise((resolve, reject) => {
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let out = `${target}.enc`;
    let r = fs.createReadStream(target);
    let w = fs.createWriteStream(out);
    w.write(iv);
    r.pipe(cipher).pipe(w);
    w.on("finish", ()=>{ 
        console.log(chalk.green(`\nSuccessfully Finished!\nPath: ${out}\n[ * ] Use this path to Decrypt later..`));
        fs.unlinkSync(target);
        resolve();
        });
    r.on("error", reject);
    w.on("error", reject);
    cipher.on("error", reject);
    });
};

async function encdir(target, deep, key) {
    let list = fs.readdirSync(target, {withFileTypes: true})
    for (let one of list) {
            if (one.isFile()) {
                one = path.join(target, one.name);
                await encfile(one, key);
            } else if (deep==true && one.isDirectory()) {
            one = path.join(target, one.name);
            await encdir(one, deep, key);
            
        };
    };
};

async function decfile(target, key) {
await new Promise((resolve, reject) => {
    if (!target.endsWith(".enc")) return resolve();
    let out = target.replace(".enc", "");
    let iv = Buffer.alloc(16);
    let fd = fs.openSync(target, "r");
    fs.readSync(fd, iv, 0, 16, 0);
    fs.closeSync(fd);
    let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let r = fs.createReadStream(target, {start: 16});
    let w = fs.createWriteStream(out);
    r.pipe(decipher).pipe(w);
    w.on("finish", ()=>{ 
        console.log(chalk.green(`\nSuccessfully Finished!\nPath: ${out}\n[ * ] Use this path to Encrypt later..`));
        fs.unlinkSync(target);
        resolve();
        });
    r.on("error", reject);
    w.on("error", reject);
    decipher.on("error", reject);
    });
};

async function decdir(target, deep, key) {
    let list = fs.readdirSync(target, {withFileTypes: true})
    for (let one of list) {
            if (one.isFile()) {
                one = path.join(target, one.name);
                await decfile(one, key);
            } else if (deep==true && one.isDirectory()) {
            one = path.join(target, one.name);
            await decdir(one, deep, key);
            
        };
    };
}

let argv = yargs(hideBin(process.argv))
.command("$0 [mode] [have-aes] [have-rsa] [type] [target] [deep]", "Encrypt File/Dir/Text With Hybrid Encryption", (yargs) => {
yargs.options({
"have-aes": {type: "boolean", describe: "If You Have AES-256 Key Use it.", demandOption: false, default: false},
"have-rsa": {type: "boolean", describe: "If You Have RSA Key Use it.", demandOption: false, default: false},
type: {type: "string", choices: ["text", "file", "dir"], demandOption: true, describe: "Choose to encrypt text/file/dir"},
target: {type: "string", demandOption: true, describe: "Text/File/Dir to encrypt!"},
mode: {type: "string", describe: "Choose Encryption Mode Or Decryption Mode", demandOption: true, choices: ["encrypt", "decrypt"]},
deep: {type: "boolean", describe: "Encrypt/Decrypt Files in dir and dirs in dir(Used With --type=dir only.)", demandOption: false},
"public": {type: "string", describe: "The RSA Public key path", demandOption: false},
"private": {type: "string", describe: "The RSA Private key path", demandOption: false},
"aes-key": {type: "string", describe: "The AES key path", demandOption: false}})}, (argv)=> {
clear();
banner();
let target = argv.target;
let type = argv.type;
let mode = argv.mode;
let key;
let pubkey;
let privkey;
if (argv.haveAes && argv.haveRsa) {
let aes = argv.haveAes;
let rsa = argv.haveRsa;
let rcheck = checkRSA(rsa);
pubkey = rcheck[0];
privkey = rcheck[1];

let acheck = check(aes, pubkey, privkey);
key = acheck[0];
} else if (argv.public && argv.private && argv.aesKey) {
if (
  argv.public && fs.existsSync(argv.public) &&
  argv.private && fs.existsSync(argv.private) &&
  argv.aesKey && fs.existsSync(argv.aesKey)
) {
pubkey = fs.readFileSync(argv.public, "utf-8");
privkey = fs.readFileSync(argv.private, "utf-8");
privkey = crypto.createPrivateKey(privkey);
pubkey = crypto.createPublicKey(pubkey);
key = fs.readFileSync(argv.aesKey);
key = crypto.privateDecrypt(
  {
    key: privkey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
  },
  Buffer.from(key)
);
} else {
console.log(chalk.red("Some paths not found!"));
};
} else {
let ch_rsa = input(chalk.cyan.bold("Do You Have RSA Keys? [ Y - N ]: ")).toLowerCase();
let ch_aes = input(chalk.cyan.bold("Do You Have AES-256 Key? [ Y - N ]: ")).toLowerCase();
if (ch_rsa == "n" && ch_aes == "n") {
let rcheck = checkRSA(false);
pubkey = rcheck[0];
privkey = rcheck[1];
let acheck = check(false, pubkey, privkey);
key = acheck[0];
} else if (ch_rsa == "y" && ch_aes == "n") {
let rcheck = checkRSA(true);
pubkey = rcheck[0];
privkey = rcheck[1];
let acheck = check(false, pubkey, privkey);
key = acheck[0];
} else if (ch_rsa == "y" && ch_aes == "y") {
let rcheck = checkRSA(true);
pubkey = rcheck[0];
privkey = rcheck[1];
let acheck = check(true, pubkey, privkey);
key = acheck[0];
} else if (ch_rsa == "n" && ch_aes == "y") {
let rcheck = checkRSA(false);
pubkey = rcheck[0];
privkey = rcheck[1];
let acheck = check(true, pubkey, privkey);
key = acheck[0];
}

};

clear();
banner();
if (type=="text") {

if (mode=="encrypt") {
let iv = crypto.randomBytes(16);
let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
let ivhex = iv.toString("hex");
let enc = cipher.update(target, "utf-8", "hex");
enc += cipher.final("hex");
clear();
let final = `${ivhex}:${enc}`;
banner();
console.log(chalk.cyan.bold("Result:"));
console.log(chalk.green(final));

} else if (mode=="decrypt") {

let iv = target.split(":")[0];
iv = Buffer.from(iv, "hex");
target = target.split(":")[1];
let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
let dec = decipher.update(target, "hex", "utf-8");
dec += decipher.final("utf-8");
clear();
banner();
console.log(chalk.cyan.bold("Result:"));
console.log(chalk.green(dec));

};

} else if (type=="file") {

if (!fs.existsSync(target)) {
console.log(chalk.red("Target Not Found!"));
process.exit(0);
};
console.log(chalk.cyan.bold("Starting Encrypt/Decrypt.."));
if (mode=="encrypt") {
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let out = `${target}.enc`;
    let r = fs.createReadStream(target);
    let w = fs.createWriteStream(out);
    w.write(iv);
    r.pipe(cipher).pipe(w);
    w.on("finish", ()=>{ 
        console.log(chalk.green(`Successfully Finished!\nPath: ${out}\n[ * ] Use this path to Decrypt later..`));
        fs.unlinkSync(target);
        process.exit(0);
        });

} else if (mode=="decrypt") {

    let out = target.replace(".enc", "");
    let iv = Buffer.alloc(16);
    let fd = fs.openSync(target, "r");
    fs.readSync(fd, iv, 0, 16, 0);
    fs.closeSync(fd);
    let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let r = fs.createReadStream(target, {start: 16});
    let w = fs.createWriteStream(out);
    r.pipe(decipher).pipe(w);
    w.on("finish", ()=>{ 
        console.log(chalk.green(`Successfully Finished!\nPath: ${out}\n[ * ] Use this path to Encrypt later..`));
        fs.unlinkSync(target);
        process.exit(0);
        });
        
};

} else if (type=="dir") {

async function main() {
    let deep = argv.deep;
    if (mode=="encrypt") {
        await encdir(target, deep, key);
    } else if (mode=="decrypt") {
        await decdir(target, deep, key);
    };
  };

console.log(chalk.cyan.bold("Starting Encrypt/Decrypt.."));
main();
};

})
.check((argv) => {
  if (argv.deep && argv.type !== "dir") {
    throw new Error("--deep should be used with --type=dir only!");
  }

  const hasSimple = argv.haveAes || argv.haveRsa;
  const simpleValid = argv.haveAes && argv.haveRsa;

  const hasAnyKey = argv.public || argv.private || argv.aesKey;
  const keysValid = argv.public && argv.private && argv.aesKey;

  if (hasSimple && !simpleValid) {
    throw new Error("--have-aes and --have-rsa must be used together");
  }

  if (hasSimple && hasAnyKey) {
    throw new Error("Cannot mix simple mode with key files mode");
  }

  if (hasAnyKey && !keysValid) {
    throw new Error("You must provide --public, --private, and --aes-key together");
  }

  return true;
})
.argv;
