// Import creep roles

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
const roleHauler = require('role.hauler');

// This function runs every tick

module.exports.loop = function() {

    // Loop through each creep's name in Memory.creeps

    for (var creepName in Memory.creeps) {

        // If the creep's name isn't in Game.creeps

        if (!Game.creeps[creepName]) {

            // Remove it from the memory and log that it did so

            delete Memory.creeps[creepName];
            console.log('Clearing non-existing creep memory:', creepName);
        }
    }

    // Get counts for creeps of each role

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');

    // If there aren't enough harvesters

    if (harvesters.length < 2) {

        // Spawn a new one

        var newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, MOVE], newName, { memory: { role: 'harvester' } });
    }

    // Otherwise if there aren't enough haulers
    else if (haulers.length < 2) {

        // Spawn a new one

        var newName = 'Hauler' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([CARRY, MOVE, CARRY, MOVE], newName, { memory: { role: 'hauler' } });
    }

    // Otherwise if there aren't enough upgraders
    else if (upgraders.length < 2) {

        // Spawn a new one

        var newName = 'Upgrader' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, MOVE, CARRY, MOVE], newName, { memory: { role: 'upgrader', upgrading: false } });
    }

    // If the spawn is spawning a creep

    if (Game.spawns['Spawn1'].spawning) {

        // Get the creep being spawned

        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name]

        // Visualize the role of the spawning creep above the spawn

        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y, { align: 'left', opacity: 0.8 });
    }

    // Loop through creep's names in Game.creeps

    for (var creepName in Game.creeps) {

        // Get the creep based on the its name

        var creep = Game.creeps[creepName]

        // If the creep is a harvester

        if (creep.memory.role == 'harvester') {

            // Run the creep as one and iterate

            roleHarvester.run(creep);
            continue
        }

        // If the creep is an upgrader

        if (creep.memory.role == 'upgrader') {

            // Run the creep as one and iterate

            roleUpgrader.run(creep);
            continue
        }

        // If the creep is a hauler

        if (creep.memory.role == 'hauler') {

            // Run the creep as one and iterate

            roleHauler.run(creep);
            continue
        }
    }
}