# bpy.ops.import_scene.obj()
# bpy.ops.export_scene.obj()

# bpy.ops.mesh.remove_doubles()
# bpy.ops.mesh.decimate()
# bpy.ops.mesh.delete_loose()
import bpy
import os
import time
rootDir = r'E:\code\02project\common-tools\obj'
outDir = r'E:\code\02project\common-tools\objMin'

def compress():
    bpy.ops.mesh.remove_doubles(threshold=0.0001, use_unselected=False)
    bpy.ops.mesh.decimate(ratio=1.0, use_vertex_group=False, vertex_group_factor=1.0, invert_vertex_group=False, use_symmetry=False, symmetry_axis='Y')
    bpy.ops.mesh.delete_loose(use_verts=True, use_edges=True, use_faces=False)

def listFiles(dir, format='.obj'):
    fileList = []
    for file in os.listdir(dir):
      if file.find(format) != -1:
        fileList.append(file)
        print(rootDir + '\\' + file)
        # model = bpy.ops.import_scene.obj(filepath=rootDir + '\\' + file, axis_forward='-Z', axis_up='Y', filter_glob="*.obj;*.mtl", use_edges=True, use_smooth_groups=True, use_split_objects=True, use_split_groups=True, use_groups_as_vgroups=False, use_image_search=True, split_mode='ON', global_clamp_size=0.0)
        # if bpy.types.Mesh.is_editmode == False:
        #   bpy.ops.object.editmode_toggle()
        compress()
        bpy.ops.export_scene.obj(filepath=outDir + '\\' + file, check_existing=True, axis_forward='-Z', axis_up='Y', filter_glob="*.obj;*.mtl", use_selection=False, use_animation=False, use_mesh_modifiers=True, use_edges=True, use_smooth_groups=False, use_smooth_groups_bitflags=False, use_normals=True, use_uvs=True, use_materials=True, use_triangles=False, use_nurbs=False, use_vertex_groups=False, use_blen_objects=True, group_by_object=False, group_by_material=False, keep_vertex_order=False, global_scale=1.0, path_mode='AUTO')
    return fileList

if __name__ == '__main__':
    print(time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())))
    listFiles(rootDir)
    print('ok')