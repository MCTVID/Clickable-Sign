import { world, EntityQueryOptions, Location, Dimension} from "mojang-minecraft"
import { ActionFormData, ModalFormData } from "mojang-minecraft-ui"

let dbcmd = new Map();
let failcmd = new Map();
let settingCliSi = new Map([
  ["apples", 500],
  ["bananas", 300],
  ["oranges", 200]
]);

//Convert Tag ke Array !!
const arrdbcmd = ["Clickable Sign"];

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
l
*
**/
var Base64 = {
    // scrambled lol
_keyStr : "MCTVIDGPHNEORBYLSKQFUZAWJXmctvidfhuasnzerbgkjxyplwqo0123456789+/=",
    //_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
            Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
        }

        return output;
    },

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = Base64._keyStr.indexOf(input.charAt(i++));
            enc2 = Base64._keyStr.indexOf(input.charAt(i++));
            enc3 = Base64._keyStr.indexOf(input.charAt(i++));
            enc4 = Base64._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = Base64._utf8_decode(output);

        return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },

    // private method for UTF-8 decoding
_utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = 0, c1 = 0, c2 = 0;

    while ( i < utftext.length ) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if((c > 191) && (c < 224)) {
            c1 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
            i += 2;
        }
        else {
            c1 = utftext.charCodeAt(i+1);
            c2 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
            i += 3;
        }
    }
    return string;
}
}


//clickable sign
world.events.tick.subscribe(()=> {
const query = new EntityQueryOptions();
query.type ="mctvid:database";
query.location = new Location(0, 0, 0);
let mmakhlukdb = Array.from(world.getDimension(`minecraft:the_end`).getEntities(query))
let dimension = world.getDimension("overworld")
let arrplyr = Array.from(world.getPlayers())
if (settingCliSi.get("newexe") == undefined ) {
	    try {
    	world.getDimension(`minecraft:the_end`).runCommand('execute as @p[c=1] run msg "MCTvID ok" newexe on')
        settingCliSi.set("newexe", "true")
    	}
    catch(err) {
    	world.getDimension(`minecraft:the_end`).runCommand('execute @p 0 0 0 msg "MCTvID ok" newexe off')
        settingCliSi.set("newexe", "false")
    	}
}
if (mmakhlukdb.length < 1) {
	try {
    world.getDimension(`minecraft:the_end`).spawnEntity("mctvid:database", new Location(0, 0, 0))
    dbcmd.forEach((value, key) => {
	  Array.from(world.getDimension(`minecraft:the_end`).getEntities(query)).forEach(makhlukdb => {
	  makhlukdb.addTag(`bruhmomenmctvidඞ${value}ඞ${key}`)
		})
    	})
    try {
    world.getDimension(`minecraft:the_end`).runCommand("tickingarea add 0 0 0 0 0 0 database")
    }
    catch(err) {
    	world.getDimension(`minecraft:the_end`).runCommand(`msg "MCTvID ok" ${err}`)
    }
    }
catch(err) {
    world.getDimension(`minecraft:overworld`).spawnEntity("mctvid:database", new Location(0, 0, 0))
    dbcmd.forEach((value, key) => {
	  Array.from(world.getDimension(`minecraft:overworld`).getEntities(query)).forEach(makhlukdb => {
	  makhlukdb.addTag(`bruhmomenmctvidඞ${value}ඞ${key}`)
	  })
      Array.from(world.getDimension(`minecraft:the_end`).getEntities(query)).forEach(makhlukdb => {
	  makhlukdb.addTag(`bruhmomenmctvidඞ${value}ඞ${key}`)
	  })})
  try {
    world.getDimension(`minecraft:overworld`).runCommand("tickingarea add 0 0 0 0 0 0 database")
    }
    catch(err) {
    	world.getDimension(`minecraft:the_end`).runCommand(`msg "MCTvID ok" ${err}`)
    }
    }
}
})
            
world.events.beforeItemUseOn.subscribe( async data => {
	const { blockLocation, item, source } = data;
    const { x, y, z } = blockLocation;
    const { dimension } = source;
    const block = dimension.getBlock(blockLocation);
	const overworld = world.getDimension('overworld');
    const query = new EntityQueryOptions();
    query.type ="mctvid:database";
    query.location = new Location(0, 0, 0);
    let dimxyz = `${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`

    if (block.id == "minecraft:wall_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:standing_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:spruce_wall_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:spruce_standing_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:acacia_wall_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:acacia_standing_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:birch_wall_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:birch_standing_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:darkoak_wall_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:darkoak_standing_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:jungle_wall_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:jungle_standing_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:warped_wall_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:warped_standing_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:crimson_wall_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:crimson_standing_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:mangrove_wall_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1 || block.id == "minecraft:mangrove_standing_sign" && item.id !== "minecraft:barrier" && arrdbcmd.length <= 1) {
    	while (arrdbcmd.length <= 1 ) {
    	Menyegarkan(source)
        Refresh(dimension)
        Refresh(dimension)
        Refresh(dimension)
    	arrdbcmd.push("reload")
    	}
    }
	else if (block.id == "minecraft:wall_sign" && item.id == "mctvid:clickable_sign_editor" || block.id == "minecraft:standing_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:spruce_wall_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:spruce_standing_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:acacia_wall_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:acacia_standing_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:birch_wall_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:birch_standing_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:darkoak_wall_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:darkoak_standing_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:jungle_wall_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:jungle_standing_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:warped_wall_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:warped_standing_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:crimson_wall_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:crimson_standing_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:mangrove_wall_sign" && item.id == "mctvid:clickable_sign_editor"  || block.id == "minecraft:mangrove_standing_sign" && item.id == "mctvid:clickable_sign_editor" ) {
      try {
	Firstmenulmaoancritbat(source, x, y, z, block, dimension)
    Refresh(dimension)
    }
    catch(err) {
    	}
	}
	else if (block.id == "minecraft:wall_sign" && item.id !== "mctvid:clickable_sign_editor" || block.id == "minecraft:standing_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:spruce_wall_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:spruce_standing_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:acacia_wall_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:acacia_standing_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:birch_wall_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:birch_standing_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:darkoak_wall_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:darkoak_standing_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:jungle_wall_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:jungle_standing_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:warped_wall_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:warped_standing_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:crimson_wall_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:crimson_standing_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:mangrove_wall_sign" && item.id !== "mctvid:clickable_sign_editor"  || block.id == "minecraft:mangrove_standing_sign" && item.id !== "mctvid:clickable_sign_editor" ) {
    let doakan = dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`).split("ඩ")[0]
    let sukses = dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`).split("ඩ")[1]
    let gagal = dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`).split("ඩ")[2]
    failcmd.set(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`, 0)
    try {
    try {
    Array.from(dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`).split("ඩ")[0].split(`\n`)).forEach(cmd => {
    source.runCommand(`execute positioned ${x} ${y} ${z} run ${cmd}`)
    })
    try {
    	Array.from(dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`).split("ඩ")[1].split(`\n`)).forEach(sks => {
    	source.runCommand(`execute positioned ${x} ${y} ${z} run ${sks}`)
    })
        }
        catch(err) {
        	}
	}
	catch(err) {
		Array.from(dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`).split("ඩ")[2].split(`\n`)).forEach(ggl => {
		source.runCommand(`execute positioned ${x} ${y} ${z} run ${ggl}`)
		Refresh(dimension)
        Refresh(dimension)
        Refresh(dimension)
		})}
		}
		//execute lama
	catch(err) {
	try {
    Array.from(dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`).split("ඩ")[0].split(`\n`)).forEach(cmd => {
    	//buat onklik
try {
    source.runCommand(`execute @s ${x} ${y} ${z} ${cmd}`)
    }
    catch(err) {
    	failcmd.set(`${dimxyz}`, `${failcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`) + 1}`)
    	}
    })
    if(failcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`) == 0 || failcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`) == undefined) {
    try {
    	Array.from(dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`).split("ඩ")[1].split(`\n`)).forEach(sks => {
    	source.runCommand(`execute @s ${x} ${y} ${z} ${sks}`)
    })
        }
        catch(err) {
        	}
        }
        if(failcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`) >= Array.from(dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`).split("ඩ")[0].split(`\n`)).length) {
        Array.from(dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`).split("ඩ")[2].split(`\n`)).forEach(ggl => {
        	try{
		source.runCommand(`execute @s ${x} ${y} ${z} ${ggl}`)
		}
		catch(err) {
			}
		Refresh(dimension)
        Refresh(dimension)
        Refresh(dimension)
        })
	}
	}
	catch(err) {
		}
}}})

    function OnSuccess(source, x, y, z, block, dimension) {
    	    try {
    	Array.from(dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`).split("ඩ")[1].split(`\n`)).forEach(sks => {
    	try {
    	source.runCommand(`execute @s ${x} ${y} ${z} ${sks}`)
    }
    catch(err) {
    	source.runCommand(`msg "MCTvID ok" ${err}`)
    }
    })
        }
        catch(err) {
    	world.getDimension(`minecraft:the_end`).runCommand(`msg "MCTvID ok" ${err}`)
    }
    }
    
    function OnFail(source, x, y, z, block, dimension) {
    	Array.from(dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`).split("ඩ")[2].split(`\n`)).forEach(ggl => {
			try {
		source.runCommand(`execute @s ${x} ${y} ${z} ${ggl}`)
		}
		catch(err) {
			source.runCommand(`msg "MCTvID ok" ${err}`)
			}
		source.runCommand(`msg "MCTvID ok" ${err}`)
		Refresh(dimension)
        Refresh(dimension)
        Refresh(dimension)
        })
    	}

    function Firstmenulmaoancritbat(source, x, y, z, block, dimension) {
    const form = new ActionFormData()
      .title("Clickable Sign")
      .body(`§o§7Addon by MCTvID§r`)
      .button("Edit", "textures/ui/book_edit_default")
      .button("Import", "textures/ui/import")
      if(dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`) !== undefined) {
      form.button("Export", "textures/ui/copy")
      }
      if(dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`) !== undefined) {
      form.button("Delete", "textures/ui/icon_trash")
      }
          form.show(source).then(result => {
      if (result.selection === 0) {
        Editsigncmd(source, x, y, z, block, dimension);
      }
      if (result.selection === 1) {
      	try {
      	ImportCode(source, x, y, z, block, dimension);
      }
      catch(err) {
      	source.runCommand(`msg "MCTvID ok" ${err}`)
      	}
      }
      if (result.selection === 2) {
      	try {
      	EncodeCode(source, x, y, z, block, dimension);
      }
      catch(err) {
      	source.runCommand(`msg "MCTvID ok" ${err}`)
      	}
      }
      if (result.selection === 3) {
      	DelDelete(source, x, y, z, block, dimension);
      }})}
     
function DelDelete(source, x, y, z, block, dimension) {
	const query = new EntityQueryOptions();
    query.type ="mctvid:database";
    query.location = new Location(0, 0, 0);
	const yawlo = new ActionFormData()
	.title("Delete")
	.body("§cDo You Want To Delete Clickable Sign Data In This Sign?\n§7§othis action cannot be undone")
	.button("Yes")
	.button("No")
	yawlo.show(source).then(result => {
		   if (result.selection === 0) {
			Array.from(world.getDimension(`minecraft:the_end`).getEntities(query)).forEach(makhlukdb => {
            makhlukdb.getTags().forEach(tag=>{
                if(tag.includes(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`)){
                    makhlukdb.removeTag(tag);
                    dbcmd.delete(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`)
                    if(arrdbcmd.includes(tag)) {
                    	let idx = arrdbcmd.indexOf(tag)
                        arrdbcmd.splice(idx, 1)
                        }}})})
             Array.from(world.getDimension(`minecraft:overworld`).getEntities(query)).forEach(makhlukdb => {
            makhlukdb.getTags().forEach(tag=>{
                if(tag.includes(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`)){
                    makhlukdb.removeTag(tag);
                    dbcmd.delete(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`)
                    if(arrdbcmd.includes(tag)) {
                    	let idx = arrdbcmd.indexOf(tag)
                        arrdbcmd.splice(idx, 1)
                        }}})})
			}
			      if (result.selection === 1) {
				}
})}

function ImportCode(source, x, y, z, block, dimension) {
	const query = new EntityQueryOptions();
    query.type ="mctvid:database";
    query.location = new Location(0, 0, 0);
	const yawlo = new ModalFormData()
	.title("Import")
	.textField("Import\n§7§oin some cases the results can be wrong", "paste here")
	yawlo.show(source).then(result => {
		if (result.formValues[0] !== "") {
			let [paste] = result.formValues;
			try {
			let decoded = Base64.decode(`${paste}`)
			let decodedd = decoded.replaceAll("™","ඩ")
			Array.from(world.getDimension(`minecraft:the_end`).getEntities(query)).forEach(makhlukdb => {
            makhlukdb.getTags().forEach(tag=>{
                if(tag.includes(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`)){
                    makhlukdb.removeTag(tag);
            }})})
            Array.from(world.getDimension(`minecraft:the_end`).getEntities(query)).forEach(makhlukdb => {
            makhlukdb.addTag(`bruhmomenmctvidඞ${decodedd}ඞ${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`)
            })
            dbcmd.set(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`, `${decodedd}`)
            Refresh(dimension)
            }
            catch(err) {
            	source.runCommand(`msg "MCTvID ok" ${err}`)
            }
		}})
	}

function EncodeCode(source, x, y, z, block, dimension) {
	let zamn = dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`)
	let zamnbener = zamn.replaceAll("ඩ","™").replaceAll("�","")
	const damn = new ModalFormData()
	.title("Export")
	if(dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`) == undefined) {
    const zilyn = "This sign is not clickable yet"
    damn.textField("Result\n§7§ocopy this textfield", "Empty")
    }
    else {
    	const zilyn = Base64.encode(zamnbener)
        damn.textField("Result\n§7§ocopy this textfield", "Empty", `${zilyn}`)
    }
	damn.show(source).then(result => {
		})}
      
function Menyegarkan(source) {
  let dimension = world.getDimension(`minecraft:the_end`)
  const logform = new ActionFormData()
    .title(`${arrdbcmd}`)
    .body(`§o§7${arrdbcmd}\n§7§oLoading..\n\n\n§rYou can use Clickable Sign again after closing this form`)
    .button("Back", "textures/ui/arrow_left")
   logform.show(source).then(result => {
      if (result.isCanceled) {
          Refresh(dimension)
          Refresh(dimension)
          Refresh(dimension)
          }
      else if (result.selection === 0) {
        Refresh(dimension)
        Refresh(dimension)
        Refresh(dimension)
      }  
})}
         
    function Refresh(dimension) {
    const overworld = world.getDimension('overworld');
    const query = new EntityQueryOptions();
    query.type ="mctvid:database";
    query.location = new Location(0, 0, 0);
    let mmakhlukdb = Array.from(world.getDimension(`minecraft:the_end`).getEntities(query))
        dbcmd.forEach(dbCmdArr)
        arrdbcmd.forEach(arrdbcmd => {
        	Array.from(world.getDimension(`minecraft:the_end`).getEntities(query)).forEach(makhlukdb => {
            makhlukdb.addTag(arrdbcmd)
            })})
            Array.from(world.getDimension(`minecraft:the_end`).getEntities(query)).forEach(makhlukdb => {
                makhlukdb.getTags().forEach(tag=>{
                    if(tag.includes(`bruhmomen`)){
                    const dbccmd = tag.split(`ඞ`);
                    let x = dbccmd[dbccmd.length-3]
                    let y = dbccmd[dbccmd.length-2]
                    let z = dbccmd[dbccmd.length-1]
                    let cmd = dbccmd[dbccmd.length-5]
                    let dim = dbccmd[dbccmd.length-4]
                    dbcmd.set(`${dim}ඞ${x}ඞ${y}ඞ${z}`, `${cmd}`)
                }
            })})
            if(mmakhlukdb.length >= 2) {
    	world.getDimension(`minecraft:the_end`).runCommand("kill @e[type=mctvid:database,c=-1]")
    	}
    }
		
function dbCmdArr(value, key, map) {
	arrdbcmd.forEach(arrdbcmd => {
	if(arrdbcmd.includes(`${key}`)) {
		let idx = arrdbcmd.indexOf(arrdbcmd)
        arrdbcmd.splice(idx, 1)
		}})
arrdbcmd.push(`bruhmomenmctvidඞ${value}ඞ${key}`);
}

function Editsigncmd(source, x, y, z, block, dimension) {
    const query = new EntityQueryOptions();
    query.type ="mctvid:database";
    query.location = new Location(0, 0, 0);
    let mvyyn = dbcmd.get(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`)
	const logform = new ModalFormData()
      .title("Clickable Sign")
      if (mvyyn == undefined) {
      	logform.textField(`§7§o${block.id.split(":")[1]}\n§7§o${x} ${y} ${z} \n\n§rOn-click\n§7§oexecuted when player click sign`, `tp ${source.nameTag} ${x} ${y} ${z}`)
      }
      else {
      	if (mvyyn.split("ඩ")[0] == undefined) {
      	logform.textField(`§7§o${block.id.split(":")[1]}\n§7§o${x} ${y} ${z} \n\n§rOn-click\n§7§oexecuted when player click sign`, `tp ${source.nameTag} ${x} ${y} ${z}`)
      	}
      else {
          let akuinginpahala = mvyyn.split("ඩ")[0]
      	logform.textField(`§7§o${block.id.split(":")[1]}\n§7§o${x} ${y} ${z} \n\n§rOn-click\n§7§oexecuted when player click sign`, `tp ${source.nameTag} ${x} ${y} ${z}`, `${akuinginpahala}`)
      }}
      if (mvyyn == undefined) {
      	logform.textField(`On-fail§7§o optional\n§7§oexecuted when one or more On-click commands error`, `say Fail`)
      }
      else {
      	if (mvyyn.split("ඩ")[2] == undefined) {
      	logform.textField(`On-fail§7§o optional\n§7§oexecuted when one or more On-click commands error`, `say Fail!`)
      	}
      else {
          let gagal = mvyyn.split("ඩ")[2]
      	logform.textField(`On-fail§7§o optional\n§7§oexecuted when one or more On-click commands error`, `say Fail!`, `${gagal}`)
      }}
      if (mvyyn == undefined) {
      	logform.textField(`On-success§7§o optional\n§7§oExecuted when On-click command run successfully§r`, `say Success!`, "")
      }
      else {
      	if (mvyyn.split("ඩ")[1] == undefined) {
      	logform.textField(`On-success§7§o optional\n§7§oExecuted when On-click command run successfully§r`, `say Success!`)
      	}
      else {
          let sukses = mvyyn.split("ඩ")[1]
      	logform.textField(`On-success§7§o optional\n§7§oExecuted when On-click command run successfully§r`, `say Success!`, `${sukses}`)
      }
      }
   //   .dropdown(`select`, arrdbcmd)
    logform.show(source).then(result => {
        if (result.formValues[0] !== "") {
        	let [cmd, ggl, sks] = result.formValues;
        Array.from(world.getDimension(`minecraft:the_end`).getEntities(query)).forEach(makhlukdb => {
            makhlukdb.getTags().forEach(tag=>{
                if(tag.includes(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`)){
                    makhlukdb.removeTag(tag);
            }})})
            Array.from(world.getDimension(`minecraft:the_end`).getEntities(query)).forEach(makhlukdb => {
            makhlukdb.addTag(`bruhmomenmctvidඞ${cmd}ඩ${sks}ඩ${ggl}ඞ${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`)
            })
            dbcmd.set(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`, `${cmd}ඩ${sks}ඩ${ggl}`)
            Refresh(dimension)
		}
	}
	)
	}
	
world.events.blockBreak.subscribe( data => {
	const { block, dimension, player, brokenBlockPermutation } = data;
	const { location } = block;
	const { x, y, z } = location;
	const overworld = world.getDimension('overworld');
    const query = new EntityQueryOptions();
    query.type ="mctvid:database";
    query.location = new Location(0, 0, 0);
	if(brokenBlockPermutation.type.id !== 'minecraft:bedrock'){
		Array.from(world.getDimension(`minecraft:the_end`).getEntities(query)).forEach(makhlukdb => {
            makhlukdb.getTags().forEach(tag=>{
                if(tag.includes(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`)){
                    makhlukdb.removeTag(tag);
                    dbcmd.delete(`${dimension.id.split(":")[1]}ඞ${x}ඞ${y}ඞ${z}`)
                    if(arrdbcmd.includes(tag)) {
                    	let idx = arrdbcmd.indexOf(tag)
                        arrdbcmd.splice(idx, 1)
                }}
            })
        })
	}
});
	
	
world.events.beforeItemUse.subscribe((ancritLmao) => {
    let item = ancritLmao.item;
    let player = ancritLmao.source;
    let pegang = player.getComponent('minecraft:inventory').container.getItem(player.selectedSlot).id

    if (item.id == "mctvid:xp_transfer") {
    	XpTransfer(player);
    }
    if (item.id == "mctvid:xp_ttransfer") {
    	try {
    	if (pegang == "mctvid:xp_ttransfer") {
        player.runCommand(`replaceitem entity @s[lm=10,hasitem={location=slot.weapon.mainhand,item=${pegang}}] slot.weapon.mainhand 0 mctvid:xp_transfer`)
        player.runCommand(`xp -10L @s[lm=10]`)
        }
        }
        catch(err) {
        	player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYour XP is not enough!§r"}]}`)
}}});

function XpTransfer(player) {
  let vlayerarray = Array.from(world.getPlayers)
  const modal = new ModalFormData()
  .title("XP Transfer")
  .dropdown(`Select Player To Transfer`, arrdbcmd)
  .slider(`Level amount`, 1, 100, 1, 1)
      modal.show(player).then(result => {
        if (result.formValues[1] !== "") {
        	try {
          let [pemaindropd, jumlah] = result.formValues;
          player.runCommand(`execute @s[lm=${jumlah}] ~~~ tellraw @a[name="${vlayerarray[pemaindropd]}"] {"rawtext":[{"text":"§aYou get ${jumlah} XP from §e${player.nameTag}§r"}]}`)
          player.runCommand(`execute @s[lm=${jumlah}] ~~~ tellraw @s {"rawtext":[{"text":"§aSuccessfully transfer ${jumlah} XP to §e${vlayerarray[pemaindropd]}§r"}]}`)
          player.runCommand(`execute @s[lm=${jumlah}] ~~~ xp ${jumlah}L "${vlayerarray[pemaindropd]}"`)
          player.runCommand(`execute @s[lm=${jumlah}] ~~~ xp -${jumlah}L @s`)
          }
          catch(err) {
          	player.runCommand(`tellraw @s {"rawtext":[{"text":"§cFailed to transfer, Your XP is not enough§r"}]}`)
          }
      }
      }
      )
}
