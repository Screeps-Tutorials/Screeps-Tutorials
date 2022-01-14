var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // Find sources in the room

        var sources = creep.room.find(FIND_SOURCES)

        // Find the closest source to the creep

        const closestSource = creep.pos.findClosestByRange(sources)

        // Try to harvest the source. If it isn't in range

        if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {

            // Move to it

            creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
};

module.exports = roleHarvester;