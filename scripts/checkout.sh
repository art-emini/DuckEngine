#!/bin/bash

mkdir -p release

clear
read -p "Are docs up to date and is everything documented correctly? [Y/n] " -n 1 -r
echo -e "\n"  # move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
	clear
    read -p "Are dependecies up to date? [Y/n] " -n 1 -r
	echo -e "\n"  # move to a new line
	if [[ $REPLY =~ ^[Yy]$ ]]
	then
		clear
		read -p "Are changelogs, READMEs, and itch.io pages up to date? [Y/n] " -n 1 -r
		echo -e "\n"  # move to a new line
		if [[ $REPLY =~ ^[Yy]$ ]]
		then
			clear
			read -p "Are all new classes added to the Duck namespace? [Y/n] " -n 1 -r
			echo -e "\n"  # move to a new line
			if [[ $REPLY =~ ^[Yy]$ ]]
			then
				clear
				read -p "Are the examples up to date? [Y/n]" -n 1 -r
				echo -e "\n"
				if [[ $REPLY =~ ^[Yy]$ ]]
				then
				    clear
					read -p "Is the new version correctly updated in the package.json, readme, and version file? [Y/n] " -n 1 -r
					echo -e "\n"  # move to a new line
					if [[ $REPLY =~ ^[Yy]$ ]]
					then
						clear
						echo -e "This will run the build, lint, and format commands before continuing. \n"
						echo -e "This will create a zip and tar.gz file in the release directory with the new build. \n"
	
						read -p "Are you sure that you would like to create a new release (compressed versions of build)? [Y/n] " -n 1 -r
	
						echo -e "\n"  # move to a new line
						if [[ $REPLY =~ ^[Yy]$ ]]
						then
							clear
							echo "What is the version name?"
							read version
							clear
							
							read -p "Is version \"$version\" correct? [Y/n] " -n 1 -r
							echo -e "\n"  # move to a new line
							if [[ $REPLY =~ ^[Yy]$ ]]
							then
								clear
								echo -e "Starting... \n"
							   	echo -e "Running build... \n"
								yarn run build
								echo -e "\n"  # move to a new line
	
								echo -e "Copying contents into new release/$version/ \n"
								cp -r dist "release/$version"
	
								echo -e "Making directory zipped/$version \n"
								mkdir "release/zipped/$version"
	
								echo -e "Zipping into release/zipped/$version/$version.zip from release/$version \n"
								zip -qr "release/zipped/$version/$version.zip" "release/$version/"
	
								echo -e "Making a tar.gz into release/zipped/$version/$version.tar.gz from release/$version \n"
								tar -czf "release/zipped/$version/$version.tar.gz" "release/$version/"
	
								echo "Finished"
								exit 0
							fi
						fi
					fi
				fi
			fi
		fi
	fi
fi

clear
echo "Fix all of the issues and run again."

exit 1
