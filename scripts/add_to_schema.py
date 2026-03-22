import os, json, codecs

# module = int(raw_input("Enter msodule: "))

mainpath = '/Library/WebServer/Documents/agoralms/ccourses/13/'
langpath = mainpath + 'lang/en/'
schemafile = mainpath + 'modules/1/schema-en.json'

mod_count = 8
page_range = (5,40)

pages = []
f_schema = open (schemafile, 'r')
schema = json.loads(f_schema.read())

page_data_proto = {
    "id": 0,
    "tmpl": "tmpl-video-presentation",
    "visible": True,
    "order": 0,
    "tmplParams": {
        "backColor": "#3f3f3f",
        "theme": "yellow",
        "video_provider": "youtube",
        "video_url": "XXX",
        "slides": None
    }
}

# Loading the schema file
for ix in range(page_range[1], page_range[0]-1, -1):
    print('parsing file: ' + str(ix))
    fl_name = ''
    for sec in range(0,mod_count):
        p_fl_name = langpath + 'content1-'+str(sec)+'-'+str(ix) + '.json'
        if os.path.isfile(p_fl_name):
            fl_name = p_fl_name
    p_data = open (fl_name, 'r')
    dataj = json.loads(p_data.read())
    slides = dataj['slides']
    module_id = 0
    if len(slides) > 1:
        if "slide" in slides[0]:
            module_id = int(slides[0]["slide"].split('_')[0][1]) - 1
    print(module_id)
    print (json.dumps(slides, indent = 4))
    # page_data = page_data_proto.copy()
    # page_data["tmplParams"]["slides"] = slides
    # page_data["id"] = ix
    # page_data["order"] = ix
    # page_data_json = json.dumps(page_data, indent = 4)
    # schema["sections"][module_id]["pages"].insert(1, page_data)
    # os.rename(langpath + 'content1-0-'+str(ix) + '.json',
    #           langpath + 'content1-'+str(module_id)+'-'+str(ix) + '.json')
    # print (page_data_json)
    # print(page_data.dumps(parsed, indent=4, sort_keys=True))

schema_json = json.dumps(schema, indent = 4)
# print (schema_json)
