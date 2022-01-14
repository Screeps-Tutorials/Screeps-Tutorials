var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // If the hauler isn't full

        if (creep.store.getFreeCapacity() > 0) {

            // Find energy on the ground

            const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            })

            // Find the closest energy on the ground

            const closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)

            // Try to pickup the energy. If it's not in range

            if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {

                // Move to it

                creep.moveTo(closestDroppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
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