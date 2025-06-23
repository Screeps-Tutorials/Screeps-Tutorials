var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // If the hauler isn't full

        if (creep.store.getFreeCapacity() > 0) {

            // Now there's just one function to run to pickup energy :) (see prototype.screeps.js file for more)
            // If you want to add the lines you can edit the prototype.screeps.js file
            creep.pickupEnergy();
        } else {

            // Find spawns in the room

            const spawns = creep.room.find(FIND_MY_SPAWNS)

            // Find the closest spawn

            const closestSpawn = creep.pos.findClosestByRange(spawns)

            // Try to transfer energy to the spawn. If it's not in range

            if (creep.transfer(closestSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

                // Move to it

                creep.moveTo(closestSpawn, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleHauler;