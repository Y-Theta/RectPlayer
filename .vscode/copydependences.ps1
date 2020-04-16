$script:module = "./node_modules/"
$script:dist = "./out/"

$script:modules = @("less","xml-js")
$script:suffix = ".min.js"

foreach($mod in $modules){
    $file = $module + $mod +"/dist/"+ $mod + $suffix
    $distfile = $dist + $mod + $suffix
    if(![io.File]::Exists($distfile)){
        cp $file $distfile
    }
}

cp "./RectPlayer/*" "./out/RectPlayer"