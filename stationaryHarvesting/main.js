// Import creep rolesList

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
const roleHauler = require('role.hauler');

/**
 * List of all the rolesList our creeps can get in our game
 * This will help to make the code more readable by changing the spawning system
 *
 * 
 * It's format is 'roleName': minNbRolesInRoom
 * 
 * Most important role on the bottom of the list
 */

const rolesList = {
    'upgrader': 2,
    'hauler': 2,
    'harvester': 2
}

// Calling all prototypes to have them working
require('prototype.creep');

// This function runs every tick

module.exports.loop = function () {

    // Loop through each creep's name in Memory.creeps

    for (var creepName in Memory.creeps) {

        // If the creep's name isn't in Game.creeps

        if (!Game.creeps[creepName]) {

            // Remove it from the memory and log that it did so

            delete Memory.creeps[creepName];
            console.log('Clearing non-existing creep memory:', creepName);
        }
    }

    // Loop through each role's name in rolesList
    for (let role in rolesList) {
        // Get the number of creeps that have this role
        var nbCreeps = _.sum(Game.creeps, (creep) => creep.memory.role == role)

        // Check if there's enough creeps using this role
        if (nbCreeps < rolesList[role]) {
            // You can check the role that's gonna spawn to make different bodies or memories

            if (role == 'hauler') {
                // Spawning the creep with his body, his unique name changing along his role and his memory

                Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], role + Game.time, { memory: { role: role, working: false } });
            } else if (role == 'harvester') {
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, MOVE, MOVE], role + Game.time, { memory: { role: role } });
            } else {
                // This will be the default creep

                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], role + Game.time, { memory: { role: role, working: false } });
            }
        }
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

        // Check the creep role
        switch(creep.memory.role) {
            // If it's an harvester
            case 'harvester': roleHarvester.run(creep); break;

            // If it's an hauler
            case 'hauler': roleHauler.run(creep); break;

            // If it's an upgrader
            case 'upgrader': roleUpgrader.run(creep); break;
        }
    }
}