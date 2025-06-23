var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // This is to record a persistent state of what the creep should be doing

        // If the creep is upgrading and is empty

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {

            // Set upgrading to false and say so

            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }

        // Otherwise if the creep is not upgrading but is full
        else if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {

            // Set upgrading to true and say so

            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        // This is having the creep operate based on the upgrading state

        // If the creep is upgrading

        if (creep.memory.upgrading) {

            // Try to upgrade the controller. If not in range

            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {

                // Move to it

                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            // Now there's just one function to run to pickup energy :) (see prototype.screeps.js file for more)
            creep.pickupEnergy();
        }
    }
};

module.exports = roleUpgrader;