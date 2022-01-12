var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
const roleHauler = require('role.hauler');

module.exports.loop = function() {

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');

    if (harvesters.length < 2) {

        var newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, MOVE], newName, { memory: { role: 'harvester' } });
    } else if (haulers.length < 2) {

        var newName = 'Hauler' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([CARRY, MOVE, CARRY, MOVE], newName, { memory: { role: 'hauler' } });
    } else if (upgraders.length < 2) {

        var newName = 'Upgrader' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, MOVE, CARRY, MOVE], newName, { memory: { role: 'upgrader', upgrading: false } });
    }

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y, { align: 'left', opacity: 0.8 });
    }

    for (var name in Game.creeps) {

        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {

            roleHarvester.run(creep);
            continue
        }
        if (creep.memory.role == 'upgrader') {

            roleUpgrader.run(creep);
            continue
        }
        if (creep.memory.role == 'hauler') {

            roleHauler.run(creep);
            continue
        }
    }
}