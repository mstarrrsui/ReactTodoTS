$basepath='dist'
$fullbasepath=(Get-Item $basepath).FullName
$fullparentpath=(Get-Item $basepath).Parent.FullName
$fullparentpath

$files =  Get-ChildItem -Path $fullbasepath -Recurse -File
foreach ($f in $files) {
	$relativename = $f.FullName.Substring($fullparentpath.length+1)
	Write-Output $relativename
	aws s3 cp $relativename s3://starrdev.com/
}